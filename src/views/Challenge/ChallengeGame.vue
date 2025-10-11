<script>
import { mapState } from 'pinia';
import indexStore from '../../store/indexStore';

export default {
  props: ["name", "lesson", "v", "n", "adj", "hoka"],
  data() {
    return {
      playerName: this.name,
      score: 0,
      timeLeft: 60,
      timer: null,
      isHelp: false,
      currentIndex: 0,
      questions: [],
      showModal: false,
      savedModalVisible: false,
      finalMessage: ""
    };
  },
  computed: {
    ...mapState(indexStore, ["lessons"]),
    formattedTime() {
      const minutes = String(Math.floor(this.timeLeft / 60)).padStart(2, "0");
      const seconds = String(this.timeLeft % 60).padStart(2, "0");
      return `${minutes}:${seconds}`;
    },
    currentQuestion() {
      return this.questions[this.currentIndex] || {};
    },
    questionProgress() {
      return `${Math.min(this.currentIndex + 1, this.questions.length)}/${this.questions.length}`;
    },
    // 只在漢字（或連續漢字塊）上加 rt 的分段結果（給 <ruby> 使用）
    furiganaParts() {
      const q = this.currentQuestion || {};
      return this.buildFuriganaParts(q.name || "", q.reading || "");
    },
  },
  methods: {
    // ===== 計時 =====
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
          this.endGame("時間切れ！");
        }
      }, 1000);
    },

    // ===== 題庫初始化（含類別過濾）=====
    initQuestions() {
      let tempList = [];

      if (this.v === "true") {
        this.lessons[this.lesson].words.forEach((item) => {
          if (item.type === "動詞") tempList.push(item);
        });
      }
      if (this.n === "true") {
        this.lessons[this.lesson].words.forEach((item) => {
          if (item.type === "名詞") tempList.push(item);
        });
      }
      if (this.adj === "true") {
        this.lessons[this.lesson].words.forEach((item) => {
          if (item.type === "形容詞") tempList.push(item);
        });
      }
      if (this.hoka === "true") {
        this.lessons[this.lesson].words.forEach((item) => {
          // 規格統一：その他
          if (item.type === "そのほか") tempList.push(item);
        });
      }

      const shuffled = [...tempList].sort(() => Math.random() - 0.5);

      while (shuffled.length < 10 && tempList.length > 0) {
        const needed = 10 - shuffled.length;
        const extra = [...tempList].sort(() => Math.random() - 0.5).slice(0, needed);
        shuffled.push(...extra);
      }

      this.questions = shuffled.slice(0, 10);
      this.currentIndex = 0;
      // console.log("最終選題:", this.questions);
    },

    // ===== 作答流程 =====
    nextQuestion() {
      this.score += 10;
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      } else {
        clearInterval(this.timer);
        this.endGame("お疲れ様でした！");
      }
      if (this.isHelp === true) this.isHelp = false;
    },
    skipQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.score -= 10;
        this.currentIndex++;
      } else {
        this.score -= 10;
        clearInterval(this.timer);
        this.endGame("お疲れ様でした！（スキップ）");
      }
      if (this.isHelp === true) this.isHelp = false;
    },
    endGame(message) {
      if (message.includes("お疲れ様")) {
        this.score += this.timeLeft;
      }
      this.finalMessage = `${message}\n${this.playerName}さんのスコアは${this.score}点です。`;
      this.showModal = true;
    },

    // ===== 對話框與路由 =====
    closeModal() {
      this.showModal = false;
      this.$router.push({ name: "home" });
    },
    saveResult() {
      const ListOld = JSON.parse(localStorage.getItem("List")) || [];
      ListOld.push({
        name: this.playerName,
        score: this.score,
        time: new Date().toLocaleString()
      });
      localStorage.setItem("List", JSON.stringify(ListOld));
      this.showModal = false;
      this.savedModalVisible = true;
    },
    closeSavedModal() {
      this.savedModalVisible = false;
      this.$router.push({ name: "home" });
    },
    lose() {
      clearInterval(this.timer);
      this.$router.push({ name: "ChallengeModeMenu" });
    },
    isShowHelp() {
      this.isHelp = !this.isHelp;
    },

    // ===== Furigana：只在漢字上標註（避免整詞套 rt）=====
    isKanji(ch) { return /[一-龯々〇〆ヶ]/.test(ch); },
    toHiragana(s) {
      return (s || "").replace(/[ァ-ン]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
    },
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
    buildFuriganaParts(name, reading) {
      const hasKanji = /[一-龯々〇〆ヶ]/.test(name);
      if (!hasKanji || !reading) {
        return [{ text: name }]; // 純假名或無讀音 → 不加 rt
      }
      const tokens = this.splitTokens(name);
      const readH = this.toHiragana(reading);
      let rp = 0;
      const parts = [];

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
          if (readH.slice(rp, rp + kanaH.length) === kanaH) {
            rp += kanaH.length;
          } else {
            const pos = readH.indexOf(kanaH, rp);
            if (pos !== -1) rp = pos + kanaH.length;
          }
          parts.push({ text: t.text });
        } else {
          const nextKana = nextKanaFrom(i);
          let rt = "";
          if (nextKana) {
            const pos = readH.indexOf(nextKana, rp);
            if (pos !== -1) {
              rt = readH.slice(rp, pos);
              rp = pos;
            } else {
              rt = readH.slice(rp);
              rp = readH.length;
            }
          } else {
            rt = readH.slice(rp);
            rp = readH.length;
          }
          parts.push({ text: t.text, rt });
        }
      }
      return parts;
    },
  },
  mounted() {
    this.initQuestions();
    this.startCountdown();
  }
};
</script>

<template>
  <div class="container">
    <div class="main-container">
      <div class="left-panel">
        <table>
          <tr>
            <td class="label">プレイヤー</td>
            <td>{{ playerName }}</td>
          </tr>
          <tr>
            <td class="label">スコア</td>
            <td>{{ score }}</td>
          </tr>
        </table>
      </div>
      <div class="right-panel">
        <div>{{ formattedTime }}｜{{ questionProgress }}</div>
      </div>
    </div>

    <section class="main">
      <!-- ヘルプ：只在漢字上標 rt -->
      <div v-show="isHelp" class="helpFrame">
        <h2>
          <template v-for="(p, i) in furiganaParts" :key="i">
            <ruby v-if="p.rt">
              {{ p.text }}<rt>{{ p.rt }}</rt>
            </ruby>
            <span v-else>{{ p.text }}</span>
          </template>
        </h2>
      </div>

      <div class="picFrame">
        <img
          class="pic"
          :src="`/image/lessons/lesson${lesson}/${currentQuestion.name}.jpg`"
          :alt="currentQuestion.name || '画像がありません'"
        />
      </div>

      <div class="btnFrame">
        <button @click="lose" class="btn">終了する</button>
        <button @click="skipQuestion" class="btn">スキップ</button>
        <button @click="isShowHelp" class="btn">ヘルプ</button>
        <button @click="nextQuestion" class="btn">次に進む</button>
      </div>
    </section>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ finalMessage }}</p>
        <p>今回の結果は保存しますか？</p>
        <div class="modal-buttons">
          <button class="btn" @click="saveResult">保存する</button>
          <button class="btn cancel" @click="closeModal">保存しない</button>
        </div>
      </div>
    </div>

    <div v-if="savedModalVisible" class="modal">
      <div class="modal-content">
        <p>保存しました！</p>
        <div class="modal-buttons">
          <button class="btn" @click="closeSavedModal">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ====== 全域字體設定 ====== */
* { font-family: "Yu Kyokasho"; }

.container { height: 100vh; padding: 1rem; }
.main-container { height: 10vh; display: flex; justify-content: space-between; margin-bottom: 1rem; }

.left-panel table { border-collapse: collapse; width: 100%; }
.label { font-weight: bold; padding-right: 10px; }

.right-panel { display: flex; align-items: center; font-size: 1.2rem; }

.main { text-align: center; }

.helpFrame {
  min-height: 15vh;
  background-color: #f0f8ff;
  border: 2px dashed #0088cc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
}
.helpFrame ruby rt { font-size: 1rem; color: #666; }

.picFrame {
  height: 50vh; display: flex; justify-content: center; align-items: center; margin: 2rem 0;
}
.pic {
  width: 90%; max-width: 40vw; height: 100%; object-fit: contain; transition: transform 0.3s ease;
}
.pic:hover { transform: scale(1.02); }

.btnFrame { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; }
.btn {
  background-color: #4caf50; color: #fff; padding: 0.6rem 1.2rem; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.3s;
}
.btn:hover { background-color: #388e3c; }
.btn.cancel { background-color: #d9534f; }
.btn.cancel:hover { background-color: #c9302c; }

.modal {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 10;
}
.modal-content {
  background: #fff; padding: 2rem; border-radius: 8px; position: relative; width: 90vw; max-width: 600px; text-align: center; font-size: 1.2rem;
}
.modal-content p { margin-bottom: 1rem; font-size: 1.4rem; }

.modal-buttons { display: flex; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
</style>
