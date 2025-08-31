<script>
import { mapState } from 'pinia';
import indexStore from '../../store/indexStore';

export default {
  props: ["lesson", "v", "n", "adj", "hoka"],
  data() {
    return {
      questions: [],
      currentIndex: 0,
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
    }
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
      <!-- 綁定 currentIndex，選單與前/下一題自動同步 -->
      <select v-model.number="currentIndex">
        <option v-for="(word, index) in words" :key="index" :value="index">
          {{ word.name }}
        </option>
      </select>
    </div>

    <!-- 主區域：圖與詞 -->
    <section class="main">
      <div class="info-box">
        <h2 class="word-name">
          <ruby>{{ currentQuestion.name }}<rt>{{ currentQuestion.reading }}</rt></ruby>
        </h2>
        <div class="image-frame">
          <img class="pic" :src="`/image/lessons/lesson${lesson}/${currentQuestion.name}.jpg`" alt="画像がありません" />
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
  </div>
</template>


<style lang="scss" scoped>
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
  // background-color: #f0f8ff;
  border: 2px solid #000000;
  padding: 1rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
}

.word-name ruby {
  font-size: 2rem;

  rt {
    font-size: 0.9rem;
    color: #555;
  }
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
}

.pic:hover {
  transform: scale(1.03);
}

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

    &:hover {
      background-color: #388e3c;
    }
  }
}



@media (max-width: 600px) {
  .word-name {
    font-size: 1.5rem;
  }

  .image-frame {
    height: 30vh;
  }

  .btnFrame {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
