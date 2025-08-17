<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      //玩家名稱
      name: "",
      //第幾課的變數
      lesson: null,
      //品詞的checkbox
      v: false,
      n: false,
      adj: false,
      hoka: false,


    }
  }, methods: {
    GameStart() {
      // 1. 防呆：若名字為空，自動填入 "PC"
      if (!this.name.trim()) {
        this.name = "PC";
      }

      // 2. 防呆：若所有品詞皆為 false，則全設為 true
      if (!this.v && !this.n && !this.adj && !this.hoka) {
        this.v = true;
        this.n = true;
        this.adj = true;
        this.hoka = true;
      }

      // 3. 防呆：若未選擇課程，則隨機指定一個課程（1~最大值）
      if (this.lesson === null) {
        const options = [1, 2]; // ← 如果之後有更多 lesson，要記得同步擴充
        const randomIndex = Math.floor(Math.random() * options.length);
        this.lesson = options[randomIndex];
      }

      // 導向遊戲畫面
      this.$router.push({
        name: "ChallengeGame",
        params: {
          name: this.name,
          lesson: this.lesson,
          v: this.v,
          n: this.n,
          adj: this.adj,
          hoka: this.hoka
        }
      });
    }

  }
}


</script>

<template>
  <div class="container">
    <header>
      <button class="back" type="button">
        <RouterLink class="link" to="/">⬅</RouterLink>
      </button>

      <h2>チャレンジモード</h2>

    </header>
    <section>
      <div class="table">
        <div class="row">
          <div class="cell title">プレイヤー名前</div>
          <input class="cell content" type="text" v-model="name">
        </div>
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
            <input id="v" type="checkbox" value="true" v-model="v">
            <label for="n">名詞</label>
            <input id="n" type="checkbox" value="true" v-model="n">
            <label for="adj">形容詞</label>
            <input id="adj" type="checkbox" value="true" v-model="adj">
            <label for="hoka">そのほか</label>
            <input id="hoka" type="checkbox" value="true" v-model="hoka">

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
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; // 禁用全頁滾動
}

.container {
  width: 100vw;
  height: 100vh;
  background-color: #f8fafc;
  font-family: "Arial", sans-serif;
  overflow: hidden; // 禁用容器滾動
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
    width: 100vw;
    height: 20vh;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .back {
      background-color: transparent;
      border: none;
      font-size: 2.5rem;
      margin-right: 2rem;

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
      font-size: 2.8rem;
      color: #2e7d32;
      margin: 0 auto;
      font-weight: bold;
    }
  }

  section {
    width: 80vw;
    height: 60vh;
    margin: 2rem auto 0;
    border: 2px solid #388e3c;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    box-sizing: border-box;
    overflow: hidden;

    .table {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .row {
        display: flex;
        flex-wrap: wrap;

        .cell {
          padding: 1rem;
          box-sizing: border-box;

          &.title {
            width: 25%;
            background-color: #e8f5e9;
            font-weight: bold;
            text-align: center;
            color: #388e3c;
            font-size: 1.2rem;
          }

          &.content {
            width: 75%;

            input[type="text"],
            select {
              width: 100%;
              padding: 0.5rem 1rem;
              border: 1px solid #ccc;
              border-radius: 6px;
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
          gap: 1.5rem;
          padding-left: 1rem;

          label {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2e7d32;
            cursor: pointer;
          }

          input[type="checkbox"] {
            margin-left: 0.3rem;
            cursor: pointer;
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }

  .btn-area {
    margin-top: 2rem;
    display: flex;
    justify-content: center;

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

/* =========================
   RWD：只追加覆寫，不更動既有規則
   斷點：1200px / 992px / 768px / 480px
   ========================= */

/* 大型筆電與小桌機 */
@media (max-width: 1200px) {
  .container header h2 { font-size: 2.2rem; }
  .container section { width: 86vw; }
  .container section .table .row .cell.title { font-size: 1.1rem; }
  .container .btn-area .btn { padding: 1.2rem 2.2rem; font-size: 1.6rem; }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 { font-size: 1.8rem; }
}

/* 平板橫/直 */
@media (max-width: 992px) {
  /* 允許內容在小螢幕可捲動（不影響動畫） */
  html, body, .container { overflow: auto; }

  .container header {
    height: 16vh;
    padding: 0 1.25rem;
  }
  .container header .back { font-size: 2rem; margin-right: 1rem; }
  .container header h2 { font-size: 2rem; }

  .container section {
    width: 92vw;
    height: auto;            /* 讓區塊隨內容延展 */
    padding: 1.25rem;
    margin-top: 1.25rem;
  }

  .container section .table .row {
    gap: .5rem;
  }

  .container section .table .row .cell.title {
    width: 30%;
    font-size: 1rem;
    padding: .8rem;
  }
  .container section .table .row .cell.content {
    width: 70%;
  }

  .container section .table .row .box-area {
    width: 100%;
    gap: 1rem;
    padding-left: 0;
  }
  .container section .table .row .box-area label { font-size: 1.1rem; }
  .container section .table .row .cell.content input[type="text"],
  .container section .table .row .cell.content select {
    font-size: 1rem;
    padding: .5rem .8rem;
  }

  .container .btn-area { margin-top: 1.25rem; }
  .container .btn-area .btn {
    padding: 1rem 2rem;
    font-size: 1.4rem;
    border-radius: 10px;
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 { font-size: 1.6rem; }
}

/* 手機（大） */
@media (max-width: 768px) {
  .container header {
    height: auto;
    padding: .75rem 1rem;
  }
  .container header .back { font-size: 1.8rem; margin-right: .75rem; }
  .container header h2 {
    font-size: 1.6rem;
    margin: 0;
  }

  .container section {
    width: 94vw;
    padding: 1rem;
    border-radius: 10px;
  }

  /* 欄位上下堆疊 */
  .container section .table .row .cell.title,
  .container section .table .row .cell.content {
    width: 100%;
  }

  .container section .table .row .cell.title {
    text-align: left;
    font-size: 1rem;
    padding: .65rem .8rem;
  }

  .container section .table .row .cell.content input[type="text"],
  .container section .table .row .cell.content select {
    width: 100%;
    font-size: 1rem;
    padding: .6rem .75rem;
  }

  .container section .table .row .box-area {
    gap: .75rem 1rem;
  }
  .container section .table .row .box-area label {
    font-size: 1rem;
  }
  .container section .table .row .box-area input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  .container .btn-area .btn {
    width: 92%;
    padding: .9rem 1rem;
    font-size: 1.2rem;
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 { font-size: 1.4rem; }
}

/* 手機（小） */
@media (max-width: 480px) {
  .container { height: auto; min-height: 100vh; }
  .container header .back { font-size: 1.6rem; }
  .container header h2 { font-size: 1.4rem; }

  .container section {
    width: 96vw;
    padding: .85rem;
    margin: 1rem auto 0;
  }

  .container section .table { gap: .75rem; }

  .container section .table .row .cell.title {
    font-size: .95rem;
    padding: .55rem .7rem;
  }
  .container section .table .row .cell.content input[type="text"],
  .container section .table .row .cell.content select {
    font-size: .95rem;
    padding: .5rem .7rem;
  }

  .container .btn-area { margin-top: 1rem; }
  .container .btn-area .btn {
    width: 94%;
    padding: .8rem 1rem;
    font-size: 1.1rem;
    border-radius: 8px;
  }
  .container .btn-area .btn .p1,
  .container .btn-area .btn .p2 { font-size: 1.2rem; }
}

</style>
