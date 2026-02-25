<script>
import { mapState } from 'pinia';
import indexStore from '../../store/indexStore';

export default {
  props: ["lesson", "v", "n", "adj", "hoka"],
  data() {
    return {
      questions: [],
      currentIndex: 0,
      showWordZoom: false,
      showImageZoom: false,
    };
  },
  computed: {
    ...mapState(indexStore, ["lessons"]),
    currentQuestion() {
      return this.questions[this.currentIndex] || {};
    },
    questionProgress() {
      return `${Math.min(this.currentIndex + 1, this.questions.length)}/${this.questions.length}`;
    },
    currentCount() {
      return this.currentIndex + 1;
    },
    words() {
      return this.questions;
    },
    totalCount() {
      return this.questions.length;
    },
    // 只在漢字（或連續漢字塊）上加 rt 的分段結果
    furiganaParts() {
      const q = this.currentQuestion || {};
      return this.buildFuriganaParts(q.name || "", q.reading || "");
    },
  },
  methods: {
    back() { this.$router.push({ name: "PracticeModeMenu" }); },
    next() { if (this.currentIndex < this.totalCount - 1) this.currentIndex++; },
    prev() { if (this.currentIndex > 0) this.currentIndex--; },

initQuestions() {
  const lessonData = this.lessons[this.lesson];
  if (!lessonData) return;

  this.questions = lessonData.words.filter(word => {
    if (this.v === "true" && word.type === "動詞") return true;
    if (this.n === "true" && word.type === "名詞") return true;
    if (this.adj === "true" && word.type === "形容詞") return true;
    if (this.hoka === "true" && word.type === "そのほか") return true;
    return false;
  });

  this.currentIndex = 0;
},

    // ===== 放大行為 =====
    openWordZoom() { if (this.currentQuestion?.name) this.showWordZoom = true; },
    closeWordZoom() { this.showWordZoom = false; },
    openImageZoom() { if (this.currentQuestion?.name) this.showImageZoom = true; },
    closeImageZoom() { this.showImageZoom = false; },

    // ===== 工具：字元類別判定與轉換 =====
    isKanji(ch) { return /[一-龯々〇〆ヶ]/.test(ch); },
    toHiragana(s) {
      return (s || "")
        .replace(/[ァ-ン]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)) // カタ→ひら
        .replace(/ゔ/g, "ゔ"); // 保留
    },

    // 將表記切成 token：連續漢字塊 / 連續假名塊
    splitTokens(surface) {
      const out = [];
      if (!surface) return out;
      let buf = surface[0], prevIsKanji = this.isKanji(surface[0]);
      for (let i = 1; i < surface.length; i++) {
        const ch = surface[i], k = this.isKanji(ch);
        if (k === prevIsKanji) {
          buf += ch;
        } else {
          out.push({ type: prevIsKanji ? "kanji" : "kana", text: buf });
          buf = ch; prevIsKanji = k;
        }
      }
      out.push({ type: prevIsKanji ? "kanji" : "kana", text: buf });
      return out;
    },

    // 核心：用 reading（假名）與「表層中的假名」對齊，將 reading 分配到漢字塊
    buildFuriganaParts(name, reading) {
      const hasKanji = /[一-龯々〇〆ヶ]/.test(name);
      if (!hasKanji || !reading) {
        // 無漢字或無讀音 → 不標 rt
        return [{ text: name }];
      }

      const tokens = this.splitTokens(name);
      const readH = this.toHiragana(reading);
      let rp = 0; // reading 指標
      const parts = [];

      // 幫助函式：取下一個「kana」token 的「假名字串（轉ひら）」；若不存在回空
      const nextKanaFrom = (idx) => {
        for (let j = idx + 1; j < tokens.length; j++) {
          if (tokens[j].type === "kana") return this.toHiragana(tokens[j].text);
        }
        return "";
      };

      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.type === "kana") {
          const kanaH = this.toHiragana(t.text);
          // 與 reading 對齊（盡量匹配；不完全匹配也照常輸出）
          if (readH.slice(rp, rp + kanaH.length) === kanaH) {
            rp += kanaH.length;
          } else {
            // 若對不上，嘗試在後方找到最早匹配點，避免錯位
            const pos = readH.indexOf(kanaH, rp);
            if (pos !== -1) rp = pos + kanaH.length;
          }
          parts.push({ text: t.text }); // 假名原樣輸出
        } else {
          // 這是一段連續「漢字」塊：為整段漢字塊分配 furigana
          const nextKana = nextKanaFrom(i);
          let rt = "";
          if (nextKana) {
            const pos = readH.indexOf(nextKana, rp);
            if (pos !== -1) {
              rt = readH.slice(rp, pos);
              rp = pos; // 指到下一段假名的起點（下一輪 kana 會消耗）
            } else {
              // 找不到下一個假名 → 把剩餘 reading 都給這個漢字塊
              rt = readH.slice(rp);
              rp = readH.length;
            }
          } else {
            // 後面沒有假名 → 全部剩餘 reading
            rt = readH.slice(rp);
            rp = readH.length;
          }
          parts.push({ text: t.text, rt });
        }
      }
      return parts;
    },
  },
  mounted() { this.initQuestions(); }
};
</script>

<template>
  <div class="container">
    <!-- 上方選單 -->
    <div class="select-container">
      <select v-model.number="currentIndex">
        <option v-for="(word, index) in words" :key="index" :value="index">
          {{ word.name }}
        </option>
      </select>
    </div>

    <!-- 主區域：圖與詞 -->
    <section class="main">
      <div class="info-box">
        <!-- 只在漢字上標 rt（以分段渲染） -->
        <h2
          class="word-name"
          role="button"
          tabindex="0"
          @click="openWordZoom"
          @keyup.enter="openWordZoom"
          title="クリックで拡大表示"
        >
          <template v-for="(p, i) in furiganaParts" :key="i">
            <ruby v-if="p.rt">
              {{ p.text }}<rt>{{ p.rt }}</rt>
            </ruby>
            <span v-else>{{ p.text }}</span>
          </template>
        </h2>

        <div class="image-frame">
          <img
            class="pic"
            :src="`/image/lessons/lesson${lesson}/${currentQuestion.name}.jpg`"
            alt="画像がありません"
            role="button"
            tabindex="0"
            @click="openImageZoom"
            @keyup.enter="openImageZoom"
            title="クリックで拡大表示"
          />
        </div>
        <div class="counter">{{ currentCount }}/{{ totalCount }}</div>
      </div>
    </section>

    <!-- 下方按鈕 -->
    <div class="btnFrame">
      <button @click="back" class="btn">練習終了</button>
      <button class="btn" @click="prev">前に進</button>
      <button class="btn" @click="next">次に進む</button>
    </div>

    <!-- 全螢幕：文字（同樣只在漢字上標 rt） -->
    <div
      v-if="showWordZoom"
      class="overlay overlay--word"
      role="dialog"
      aria-modal="true"
      @click="closeWordZoom"
    >
      <div class="wordstage" title="どこでもクリックして閉じる">
        <div class="wordstage-inner">
          <div class="wordstage-text">
            <template v-for="(p, i) in furiganaParts" :key="'z'+i">
              <ruby v-if="p.rt">
                {{ p.text }}<rt class="wordstage-rt">{{ p.rt }}</rt>
              </ruby>
              <span v-else>{{ p.text }}</span>
            </template>
          </div>
        </div>
        <div class="overlay-hint">画面のどこでもクリックして閉じる</div>
      </div>
    </div>

    <!-- 放大：圖片（保持原行為） -->
    <div
      v-if="showImageZoom"
      class="overlay"
      role="dialog"
      aria-modal="true"
      @click="closeImageZoom"
    >
      <div class="overlay-content" title="どこでもクリックして閉じる">
        <img
          class="zoom-image"
          :src="`/image/lessons/lesson${lesson}/${currentQuestion.name}.jpg`"
          :alt="currentQuestion.name || 'zoom image'"
        />
        <div class="overlay-hint">画面のどこでもクリックして閉じる</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ====== 全域字體設定 ====== */
* { font-family: "Yu Kyokasho"; }

/* ====== 既有區塊 ====== */
.container { display: flex; flex-direction: column; align-items: center; height: 100vh; padding: 1rem; box-sizing: border-box; }
.select-container { width: 100%; display: flex; justify-content: center; margin-bottom: 1rem;
  select { font-size: 1.2rem; padding: 0.5rem; border-radius: 0.5rem; }
}
.main { text-align: center; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.info-box { border: 2px solid #000; padding: 1rem; border-radius: 10px; width: 90%; max-width: 600px; }

.word-name {
  font-size: 2rem; cursor: pointer; user-select: none;
  ruby { font-size: 2rem; }
  rt { font-size: 0.9rem; color: #555; }
}

.image-frame { height: 40vh; display: flex; justify-content: center; align-items: center; margin-bottom: 1rem; }
.pic { max-width: 80%; max-height: 100%; object-fit: contain; transition: transform 0.3s ease; cursor: zoom-in; }
.pic:hover { transform: scale(1.03); }
.counter { font-size: 1.2rem; margin-top: 0.5rem; }

.btnFrame { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;
  .btn { background-color: #4caf50; color: #fff; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.3s; font-size: 1rem;
    &:hover { background-color: #388e3c; }
  }
}

/* ====== 放大遮罩（文字與圖片共用） ====== */
.overlay {
  position: fixed; inset: 0; background: rgba(17, 24, 39, 0.6);
  display: flex; justify-content: center; align-items: center; z-index: 999; animation: overlayFade 0.2s ease-out;
}
@keyframes overlayFade { from { opacity: 0; } to { opacity: 1; } }

/* ====== 圖片放大 ====== */
.overlay-content { max-width: 92vw; max-height: 86vh; display: flex; flex-direction: column; align-items: center; animation: popIn 0.16s ease-out; }
@keyframes popIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.zoom-image { max-width: 92vw; max-height: 80vh; border-radius: 12px; box-shadow: 0 10px 22px rgba(0,0,0,0.18); object-fit: contain; background: #fff; }
.overlay-hint { color: #e5e7eb; font-size: 0.95rem; margin-top: 0.75rem; user-select: none; }

/* ====== 文字全螢幕放大 ====== */
.wordstage { width: 100vw; height: 100vh; background: #fff; display: flex; flex-direction: column; justify-content: center; align-items: center; animation: stageIn 0.16s ease-out; cursor: pointer; padding: 4vh 3vw; box-sizing: border-box; }
@keyframes stageIn { from { transform: scale(0.985); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.wordstage-inner { max-width: 90vw; max-height: 78vh; display: grid; place-items: center; text-align: center; }
.wordstage-text { font-size: clamp(2.4rem, min(16vw, 18vh), 10rem); line-height: 1.1; color: #111827; user-select: none; white-space: pre-wrap; word-break: keep-all; }
.wordstage-rt { font-size: clamp(0.9rem, min(5.5vw, 6vh), 3rem); color: #4b5563; }

/* ====== RWD ====== */
@media (max-width: 600px) {
  .word-name { font-size: 1.5rem; ruby { font-size: 1.5rem; } }
  .image-frame { height: 30vh; }
  .btnFrame { flex-direction: column; gap: 0.8rem; }
  .wordstage { padding: 5vh 4vw; }
  .wordstage-inner { max-width: 94vw; max-height: 82vh; }
}
</style>
