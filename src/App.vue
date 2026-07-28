<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return {
      // 正確密碼轉換為 Base64: "TaiwanSyou" -> "VGFpd2FuU3lvdQ=="
      targetHash: 'VGFpd2FuU3lvdQ==',
      inputPassword: '',
      isAuthenticated: false,
      errorMessage: ''
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      // 驗證 session storage 中儲存的值
      const savedHash = sessionStorage.getItem('site_auth');
      if (savedHash === this.targetHash) {
        this.isAuthenticated = true;
      }
    },
    login() {
      // 將輸入的文字轉為 Base64 格式 (utf-8 安全轉換)
      const encodedInput = btoa(unescape(encodeURIComponent(this.inputPassword)));
      
      if (encodedInput === this.targetHash) {
        sessionStorage.setItem('site_auth', encodedInput);
        this.isAuthenticated = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = '密碼錯誤，請重新輸入！';
        this.inputPassword = '';
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- 已通過驗證：顯示原本的網站內容 -->
    <RouterView v-if="isAuthenticated" />

    <!-- 未通過驗證：顯示密碼輸入框 -->
    <div v-else class="password-overlay">
      <div class="password-card">
        <h2>請輸入存取密碼</h2>
        <form @submit.prevent="login">
          <input 
            type="password" 
            v-model="inputPassword" 
            placeholder="請輸入密碼"
            autocomplete="current-password"
          />
          <button type="submit">確認</button>
        </form>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .password-card {
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    max-width: 400px;

    h2 {
      margin-bottom: 1.5rem;
      color: #333333;
      font-size: 1.25rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 0.75rem 1rem;
        border: 1px solid #cccccc;
        border-radius: 6px;
        font-size: 1rem;
        outline: none;

        &:focus {
          border-color: #42b883;
        }
      }

      button {
        padding: 0.75rem;
        background-color: #42b883;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #33a06f;
        }
      }
    }

    .error-msg {
      margin-top: 1rem;
      color: #e74c3c;
      font-size: 0.9rem;
    }
  }
}
</style>