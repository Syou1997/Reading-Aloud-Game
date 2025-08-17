<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      lesson: null,
      v: false,
      n: false,
      adj: false,
      hoka: false,
    };
  },
  methods: {
    GameStart() {
      // 如果四個品詞都沒選，就當成四個都選
      if (!this.v && !this.n && !this.adj && !this.hoka) {
        this.v = this.n = this.adj = this.hoka = true;
      }

      // 如果 lesson 沒選，就從選項中隨機選一個
      if (this.lesson === null) {
        const lessons = [1, 2]; // ← 可擴充
        this.lesson = lessons[Math.floor(Math.random() * lessons.length)];
      }

      this.$router.push({
        name: "PracticeMode",
        params: {
          lesson: this.lesson,
          v: this.v,
          n: this.n,
          adj: this.adj,
          hoka: this.hoka,
        },
      });
    }
  }
};
</script>

<template>
  <div class="container">
    <header>
      <button class="back" type="button">
        <RouterLink class="link" to="/">⬅</RouterLink>
      </button>
      <h2>練習モード</h2>
    </header>

    <section>
      <div class="table">
        <div class="row">
          <div class="cell title">ステージ</div>
          <div class="cell content">
            <select name="lesson" id="lesson" v-model="lesson">
              <option value=1>lesson1</option>
              <option value=2>lesson2</option>
              <option value=3>lesson3</option>
              <option value=3>lesson3</option>
              <option value=4>lesson4</option>
              <option value=5>lesson5</option>
              <option value=6>lesson6</option>
              <option value=7>lesson7</option>
              <option value=8>lesson8</option>
              <option value=9>lesson9</option>
              <option value=10>lesson10</option>
              <option value=11>lesson11</option>
              <option value=12>lesson12</option>
              <option value=13>lesson13</option>
              <option value=14>lesson14</option>
              <option value=15>lesson15</option>
              <option value=16>lesson16</option>
              <option value=17>lesson17</option>
              <option value=18>lesson18</option>
              <option value=19>lesson19</option>
              <option value=20>lesson20</option>
              <option value=21>lesson21</option>
              <option value=22>lesson22</option>
              <option value=23>lesson23</option>
              <option value=24>lesson24</option>
              <option value=25>lesson25</option>
              <option value=26>lesson26</option>
              <option value=27>lesson27</option>
              <option value=28>lesson28</option>
              <option value=29>lesson29</option>
              <option value=30>lesson30</option>
              <option value=31>lesson31</option>
              <option value=32>lesson32</option>
              <option value=33>lesson33</option>
              <option value=34>lesson34</option>
              <option value=35>lesson35</option>
              <option value=36>lesson36</option>
              <option value=37>lesson37</option>
              <option value=38>lesson38</option>
              <option value=39>lesson39</option>
              <option value=40>lesson40</option>
              <option value=41>lesson41</option>
              <option value=42>lesson42</option>
              <option value=43>lesson43</option>
              <option value=44>lesson44</option>
              <option value=45>lesson45</option>
              <option value=46>lesson46</option>
              <option value=47>lesson47</option>
              <option value=48>lesson48</option>
              <option value=49>lesson49</option>
              <option value=50>lesson50</option>

            </select>
          </div>
        </div>

        <div class="row">
          <div class="cell title">品詞制限</div>
          <div class="box-area">
            <label for="v">動詞</label>
            <input id="v" type="checkbox" v-model="v">
            <label for="n">名詞</label>
            <input id="n" type="checkbox" v-model="n">
            <label for="adj">形容詞</label>
            <input id="adj" type="checkbox" v-model="adj">
            <label for="hoka">そのほか</label>
            <input id="hoka" type="checkbox" v-model="hoka">
          </div>
        </div>
      </div>
    </section>

    <div class="btn-area">
      <button @click="GameStart" class="btn">
        <p class="p1">Ready</p>
        <p class="p2">Go!</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f8fafc;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  animation: fadeInSlide 0.5s ease-out;

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    .back {
      background: none;
      border: none;
      font-size: 2.5rem;
      margin-right: 1rem;

      .link {
        text-decoration: none;
        color: #2e7d32;
        font-weight: bold;
      }

      &:hover .link {
        color: #4caf50;
      }

      cursor: pointer;
    }

    h2 {
      font-size: 2.2rem;
      color: #2e7d32;
      font-weight: bold;
      margin: 0 auto;
    }
  }

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background-color: white;

    .table {
      width: 80%;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      border: 2px solid #388e3c;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 1.5rem 2rem;
      gap: 1.5rem;

      .row {
        display: flex;
        align-items: center;

        .cell {
          &.title {
            width: 25%;
            font-weight: bold;
            color: #2e7d32;
            font-size: 1.3rem;
            text-align: center;
          }

          &.content {
            width: 75%;
            display: flex;
            align-items: center;

            select {
              width: 100%;
              padding: 0.5rem;
              border-radius: 6px;
              border: 1px solid #ccc;
              font-size: 1.1rem;
              color: #2e7d32;
              background-color: white;
            }
          }
        }

        .box-area {
          width: 75%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;

          label {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2e7d32;
          }

          input[type="checkbox"] {
            margin-left: 0.3rem;
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .btn-area {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 1.5rem 3rem;
      font-size: 1.8rem;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(72, 179, 70, 0.5);
      transition: background-color 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: #388e3c;
        transform: scale(1.05);
      }

      .p1 {
        margin: 0;
        font-size: 2rem;
      }

      .p2 {
        margin: 0;
        color: #ff5252;
        font-size: 2rem;
        display: none;
      }

      &:hover .p1 {
        display: none;
      }

      &:hover .p2 {
        display: block;
      }
    }
  }
}
/* === RWD：請貼在本檔 <style scoped> 最後，僅做響應式覆蓋 === */

/* 大螢幕到筆電 */
@media (max-width: 1280px) {
  .container header {
    height: 72px;
    padding: 0 1.25rem;
  }
  .container header h2 {
    font-size: 2rem;
  }

  .container section {
    padding: 1.5rem 0;
  }
  .container section .table {
    width: 88%;
    padding: 1.25rem 1.5rem;
    gap: 1.25rem;
  }

  .container section .table .row .cell.title {
    font-size: 1.2rem;
  }
  .container section .table .row .cell.content select {
    font-size: 1rem;
  }

  .container .btn-area .btn {
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 {
    font-size: 1.8rem;
  }
}

/* 平板（直/橫） */
@media (max-width: 1024px) {
  .container header {
    height: 66px;
    padding: 0 1rem;
  }
  .container header .back {
    font-size: 2.2rem;
    margin-right: 0.9rem;
  }
  .container header h2 {
    font-size: 1.9rem;
  }

  .container section {
    padding: 1.25rem 0;
  }
  .container section .table {
    width: 92%;
    padding: 1rem 1.25rem;
  }

  /* 仍維持左右兩欄，但比例微調 */
  .container section .table .row .cell.title {
    width: 30%;
  }
  .container section .table .row .cell.content,
  .container section .table .row .box-area {
    width: 70%;
  }

  .container section .table .row .box-area {
    gap: 0.8rem 1rem;
  }
  .container section .table .row .box-area label {
    font-size: 1.05rem;
  }

  .container .btn-area {
    height: 90px;
  }
  .container .btn-area .btn {
    padding: 1rem 2rem;
  }
}

/* 手機（≤ 768px）：改為直向堆疊，縮小留白避免截斷 */
@media (max-width: 768px) {
  .container {
    font-size: 15px; /* 緊湊但不影響動畫 */
  }

  .container header {
    height: 60px;
    padding: 0 0.9rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }
  .container header .back {
    font-size: 2rem;
    margin-right: 0.8rem;
  }
  .container header h2 {
    font-size: 1.6rem;
  }

  .container section {
    padding: 1rem 0;
    background-color: #fff;
  }
  .container section .table {
    width: 94%;
    padding: 0.9rem 1rem;
    gap: 1rem;
    border-radius: 10px;
  }

  /* 兩欄 → 一欄堆疊 */
  .container section .table .row {
    align-items: stretch;
  }
  .container section .table .row .cell.title,
  .container section .table .row .cell.content {
    width: 100%;
  }
  .container section .table .row .cell.title {
    text-align: left;
    font-size: 1.05rem;
    padding-bottom: 0.4rem;
  }
  .container section .table .row .cell.content {
    display: block;
  }
  .container section .table .row .cell.content select {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }

  .container section .table .row .box-area {
    width: 100%;
    gap: 0.7rem 1rem;
  }
  .container section .table .row .box-area label {
    font-size: 1rem;
  }
  .container section .table .row .box-area input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  .container .btn-area {
    height: 84px;
  }
  .container .btn-area .btn {
    padding: 0.9rem 1.6rem;
    font-size: 1.4rem;
    border-radius: 10px;
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 {
    font-size: 1.6rem;
  }
}

/* 極小螢幕（≤ 480px）：再縮字與間距 */
@media (max-width: 480px) {
  .container {
    font-size: 14px;
  }
  .container header {
    height: 56px;
  }
  .container header h2 {
    font-size: 1.45rem;
  }

  .container section .table {
    width: 96%;
    padding: 0.75rem 0.85rem;
    gap: 0.85rem;
  }
  .container section .table .row .cell.title {
    font-size: 1rem;
  }
  .container section .table .row .cell.content select {
    font-size: 0.95rem;
    padding: 0.45rem 0.7rem;
  }

  .container .btn-area {
    height: 78px;
  }
  .container .btn-area .btn {
    padding: 0.8rem 1.4rem;
    font-size: 1.25rem;
    box-shadow: 0 2px 6px rgba(72,179,70,0.45);
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 {
    font-size: 1.4rem;
  }
}

</style>
