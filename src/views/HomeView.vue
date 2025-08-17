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
</style>