<script>
import { mapState } from 'pinia';
import indexStore from '../../store/indexStore';

export default {
  props: ["lesson", "v", "n", "adj", "hoka"],
  data() {
    return {
      questions: [],
      currentIndex: 0,
      // 放大顯示狀態
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
    }
  },
  methods: {
    back() {
      this.$router.push({ name: "PracticeModeMenu" });
    },
    next() {
      if (this.currentIndex < this.totalCount - 1) {
        this.currentIndex++;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    initQuestions() {
      let tempList = [];

      if (this.v === "true") {
        this.lessons[this.lesson].words.forEach(item => {
          if (item.type === "動詞") tempList.push(item);
        });
      }
      if (this.n === "true") {
        this.lessons[this.lesson].words.forEach(item => {
          if (item.type === "名詞") tempList.push(item);
        });
      }
      if (this.adj === "true") {
        this.lessons[this.lesson].words.forEach(item => {
          if (item.type === "形容詞") tempList.push(item);
        });
      }
      if (this.hoka === "true") {
        this.lessons[this.lesson].words.forEach(item => {
          if (item.type === "そのほか") tempList.push(item);
        });
      }

      this.questions = tempList;
      this.currentIndex = 0; // 重新載入題目時，把下拉與畫面同步到第一個
    },

    // 放大顯示控制
    openWordZoom() {
      if (!this.currentQuestion || !this.currentQuestion.name) return;
      this.showWordZoom = true;
    },
    closeWordZoom() {
      this.showWordZoom = false;
    },
    openImageZoom() {
      if (!this.currentQuestion || !this.currentQuestion.name) return;
      this.showImageZoom = true;
    },
    closeImageZoom() {
      this.showImageZoom = false;
    },
  },
  mounted() {
    this.initQuestions();
  }
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
        <!-- 點擊文字後全螢幕放大（含 ruby/rt） -->
        <h2
          class="word-name"
          role="button"
          tabindex="0"
          @click="openWordZoom"
          @keyup.enter="openWordZoom"
          title="クリックで拡大表示"
        >
          <ruby>{{ currentQuestion.name }}<rt>{{ currentQuestion.reading }}</rt></ruby>
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

    <!-- 全螢幕：文字（含音標） -->
    <div
      v-if="showWordZoom"
      class="overlay overlay--word"
      role="dialog"
      aria-modal="true"
      @click="closeWordZoom"
    >
      <!-- 使用全螢幕白底，置中顯示；點任意處關閉 -->
      <div class="wordstage" title="どこでもクリックして閉じる">
        <div class="wordstage-inner">
          <ruby class="wordstage-text">
            {{ currentQuestion.name }}
            <rt class="wordstage-rt">{{ currentQuestion.reading }}</rt>
          </ruby>
        </div>
        <div class="overlay-hint">画面のどこでもクリックして閉じる</div>
      </div>
    </div>

    <!-- 放大：圖片（保留原行為） -->
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
/* ====== 既有區塊 ====== */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

.select-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  select {
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
}

.main {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-box {
  border: 2px solid #000000;
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
}

.word-name {
  font-size: 2rem;
  cursor: pointer;
  user-select: none;

  ruby { font-size: 2rem; }
  rt   { font-size: 0.9rem; color: #555; }
}

.image-frame {
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.pic {
  max-width: 80%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: zoom-in;
}

.pic:hover { transform: scale(1.03); }

.counter {
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.btnFrame {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  .btn {
    background-color: #4caf50;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;

    &:hover { background-color: #388e3c; }
  }
}

/* ====== 放大遮罩基礎 ====== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.6); /* 晦澀遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: overlayFade 0.2s ease-out;
}
@keyframes overlayFade { from { opacity: 0; } to { opacity: 1; } }

/* ====== 圖片放大（維持原版式樣） ====== */
.overlay-content {
  max-width: 92vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: popIn 0.16s ease-out;
}
@keyframes popIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.zoom-image {
  max-width: 92vw;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.18);
  object-fit: contain;
  background: #fff;
}

.overlay-hint {
  color: #e5e7eb;
  font-size: 0.95rem;
  margin-top: 0.75rem;
  user-select: none;
}

/* ====== 文字全螢幕放大（新） ====== */
.overlay--word {
  /* 全螢幕遮罩 + 內層舞台採白底滿版 */
}

.wordstage {
  width: 100vw;
  height: 100vh;
  background: #ffffff;              /* 全白背景，字更清楚 */
  display: flex;
  flex-direction: column;
  justify-content: center;          /* 垂直置中 */
  align-items: center;              /* 水平置中 */
  animation: stageIn 0.16s ease-out;
  cursor: pointer;                  /* 任意處可點擊關閉 */
  padding: 4vh 3vw;                 /* 邊緣留白，避免貼邊 */
  box-sizing: border-box;
}
@keyframes stageIn { from { transform: scale(0.985); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.wordstage-inner {
  max-width: 90vw;
  max-height: 78vh;
  display: grid;
  place-items: center;              /* 置中排版 */
  text-align: center;
}

.wordstage-text {
  /* 以視窗單位極大化，並保留自適應：以較小者為準以避免溢出（vw 與 vh 取 min） */
  /* 同時以 clamp 保護在超小/超大裝置上的可讀性 */
  font-size: clamp(2.4rem, min(16vw, 18vh), 10rem);
  line-height: 1.1;
  color: #111827;
  user-select: none;
  white-space: pre-wrap;            /* 若含空格或較長字仍可換行 */
  word-break: keep-all;             /* 日文/中文保持字詞自然換行 */
}
.wordstage-rt {
  /* furigana 按母字等比縮小（約 0.35～0.45 倍），並以 clamp 限制 */
  font-size: clamp(0.9rem, min(5.5vw, 6vh), 3rem);
  color: #4b5563;
}

/* ====== 既有 RWD ====== */
@media (max-width: 600px) {
  .word-name {
    font-size: 1.5rem;
    ruby { font-size: 1.5rem; }
  }

  .image-frame { height: 30vh; }

  .btnFrame {
    flex-direction: column;
    gap: 0.8rem;
  }

  /* 全螢幕文字在手機上仍盡量填滿，但保留上下邊界 */
  .wordstage {
    padding: 5vh 4vw;
  }
  .wordstage-inner {
    max-width: 94vw;
    max-height: 82vh;
  }
}
</style>
