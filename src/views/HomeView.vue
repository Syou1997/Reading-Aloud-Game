<script>
import { RouterLink } from 'vue-router'
export default {}
</script>

<template>
  <div class="container fade-in">
    <header>
      <h1 class="title slide-up">読み上げゲーム</h1>
    </header>

    <nav>
      <div class="btn PracticeBtn slide-up delay-1">
        <RouterLink class="link" to="/PracticeModeMenu">練習モード</RouterLink>
      </div>
      <div class="btn ChallengeModeMenuBtn slide-up delay-2">
        <RouterLink class="link" to="/ChallengeModeMenu">チャレンジモード</RouterLink>
      </div>
      <div class="btn RankingBtn slide-up delay-3">
        <RouterLink class="link" to="/RankingMenu">ランキング</RouterLink>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  animation: fadeIn 1.5s ease forwards;
}

// 動畫效果
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

.slide-up {
  transform: translateY(30px);
  opacity: 0;
  animation: slideUp 0.5s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.3s;
}
.delay-2 {
  animation-delay: 0.5s;
}
.delay-3 {
  animation-delay: 0.7s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

header {
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: #2e7d32;
    letter-spacing: 2px;
  }
}

nav {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    width: 60%;
    max-width: 300px;
    background: linear-gradient(135deg, #66bb6a, #43a047);
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    margin: 1.5rem 0;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1);
       background: linear-gradient(135deg, #09c21b, #0dec39);
    }

    .link {
      display: block;
      text-decoration: none;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
}
/* === RWD：請貼在本檔 <style scoped> 最後，僅做響應式覆蓋 === */

/* 大螢幕到筆電 */
@media (max-width: 1280px) {
  header .title {
    font-size: 2.6rem;
  }
  nav .btn {
    width: 56%;
    max-width: 320px;
    padding: 0.95rem;
  }
  nav .btn .link {
    font-size: 1.4rem;
  }
}

/* 平板（直/橫） */
@media (max-width: 1024px) {
  header {
    height: 22vh;
  }
  header .title {
    font-size: 2.3rem;
    letter-spacing: 1.5px;
  }

  nav {
    padding: 0 1rem;
  }
  nav .btn {
    width: 70%;
    max-width: 360px;
    margin: 1.2rem 0;
    padding: 0.9rem 1rem;
    border-radius: 14px;
  }
  nav .btn .link {
    font-size: 1.3rem;
    letter-spacing: 0.8px;
  }
}

/* 手機（≤ 768px）：縱向堆疊更緊湊 */
@media (max-width: 768px) {
  .container {
    font-size: 15px; /* 不影響你的動畫類別 */
  }

  header {
    height: 20vh;
    padding: 0 0.75rem;
  }
  header .title {
    font-size: 1.9rem;
    letter-spacing: 1px;
    text-align: center;
  }

  nav {
    width: 100%;
    padding: 0 1rem;
  }
  nav .btn {
    width: 100%;
    max-width: none;
    margin: 0.9rem 0;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.12);
  }
  nav .btn .link {
    font-size: 1.15rem;
  }
}

/* 極小螢幕（≤ 480px）：再縮字與間距 */
@media (max-width: 480px) {
  header {
    height: 18vh;
  }
  header .title {
    font-size: 1.65rem;
  }

  nav {
    padding: 0 0.75rem;
  }
  nav .btn {
    margin: 0.75rem 0;
    padding: 0.75rem 0.9rem;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.12);
  }
  nav .btn .link {
    font-size: 1.05rem;
    letter-spacing: 0.5px;
  }
}

</style>