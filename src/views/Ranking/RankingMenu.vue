<script>
export default {
  data() {
    return {
      allData: [],
      currentPage: 1,
      pageSize: 10,
      showResetModal: false,
      showDeleteConfirm: false,
      showDeletedModal: false,
      deleteTargetIndex: null,
    };
  },
  computed: {
    sortedData() {
      return [...this.allData]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);
    },
    totalPages() {
      return Math.ceil(this.sortedData.length / this.pageSize);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedData.slice(start, start + this.pageSize);
    },
  },
  methods: {
    back() {
      this.$router.push({ name: "home" });
    },
    fetchData() {
      const raw = localStorage.getItem("List");
      this.allData = raw ? JSON.parse(raw) : [];
    },
    changePage(page) {
      this.currentPage = page;
    },
    clearRanking() {
      if (confirm("本当にリセットしますか？")) {
        localStorage.removeItem("List");
        this.fetchData();
        this.currentPage = 1;
        this.showResetModal = true;
      }
    },
    closeResetModal() {
      this.showResetModal = false;
    },
    confirmDelete(index) {
      this.deleteTargetIndex = index;
      this.showDeleteConfirm = true;
    },
    deleteEntry() {
      const entryToDelete = this.paginatedData[this.deleteTargetIndex];
      const realIndex = this.allData.findIndex(
        (item) =>
          item.name === entryToDelete.name &&
          item.score === entryToDelete.score &&
          item.time === entryToDelete.time
      );

      if (realIndex !== -1) {
        this.allData.splice(realIndex, 1);
        localStorage.setItem("List", JSON.stringify(this.allData));
        this.fetchData();
      }

      this.showDeleteConfirm = false;
      this.showDeletedModal = true;
    },
    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
    },
    closeDeletedModal() {
      this.showDeletedModal = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <div class="ranking-container animate">
    <div class="header">
      <button @click="back" type="button" class="back-button">← 戻る</button>
      <button class="reset-button" @click="clearRanking">ランキングをリセット</button>
    </div>

    <h1 class="title">🏆 ランキング</h1>

    <table class="ranking-table">
      <thead>
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>スコア</th>
          <th>日時</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in paginatedData" :key="index">
          <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
          <td>{{ entry.time }}</td>
          <td>
            <button @click="confirmDelete(index)" class="delete-icon">🗑️</button>
          </td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td colspan="5">データがありません。</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }"
        @click="changePage(page)">
        {{ page }}
      </button>
    </div>

    <!-- Reset Modal -->
    <div v-if="showResetModal" class="modal">
      <div class="modal-content">
        <p>リセットされました</p>
        <button class="close-button" @click="closeResetModal">閉じる</button>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteConfirm" class="modal">
      <div class="modal-content">
        <p>本当に削除しますか？</p>
        <button class="close-button" @click="deleteEntry">はい</button>
        <button class="close-button" @click="closeDeleteConfirm">いいえ</button>
      </div>
    </div>

    <!-- Deleted Modal -->
    <div v-if="showDeletedModal" class="modal">
      <div class="modal-content">
        <p>削除されました</p>
        <button class="close-button" @click="closeDeletedModal">閉じる</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ranking-container {
  padding: 2rem;
  font-family: "Arial", sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.animate {
  animation: fadeInSlide 0.8s ease-out;
}

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.back-button {
  background-color: transparent;
  border: none;
  color: #2e7d32;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
}

.reset-button {
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #c62828;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2e7d32;
}

.ranking-table {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.ranking-table th,
.ranking-table td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

.ranking-table th {
  background-color: #e8f5e9;
  color: #388e3c;
  font-weight: bold;
}

.ranking-table tbody tr:hover {
  background-color: #f1f8e9;
}

.delete-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pagination button {
  background-color: #c8e6c9;
  color: #2e7d32;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button.active {
  background-color: #4caf50;
  color: #ffffff;
  font-weight: bold;
}

.pagination button:hover {
  background-color: #81c784;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 400px;
}

.close-button {
  background-color: #4caf50;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  margin: 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #388e3c;
}
/* === RWD：請貼在本檔 <style scoped> 最後，僅做響應式覆蓋 === */

/* 大螢幕到筆電 */
@media (max-width: 1280px) {
  .ranking-container {
    padding: 1.5rem;
  }
  .title {
    font-size: 1.9rem;
    margin-bottom: 1.5rem;
  }
  .ranking-table {
    max-width: 1000px;
  }
}

/* 平板（直/橫） */
@media (max-width: 1024px) {
  .header {
    gap: 0.75rem;
  }
  .back-button {
    font-size: 1.1rem;
  }
  .reset-button {
    padding: 0.45rem 0.9rem;
  }

  .ranking-table {
    width: 100%;
    max-width: none;
  }
  .ranking-table th,
  .ranking-table td {
    padding: 0.85rem;
  }

  .pagination {
    gap: 0.4rem;
    margin-top: 1.5rem;
  }
  .pagination button {
    padding: 0.45rem 0.9rem;
  }

  .modal-content {
    width: 86%;
    max-width: 420px;
    padding: 1.6rem;
  }
}

/* 手機（≤ 768px）：保持動畫，縮字縮距，表格可水平滑動 */
@media (max-width: 768px) {
  .ranking-container {
    padding: 1rem;
    min-height: 100vh; /* 保留滿版視覺與動畫 */
  }

  .header {
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
  }
  .reset-button {
    order: 2; /* 只調整排列順序，不改結構 */
  }

  .title {
    font-size: 1.6rem;
    margin: 1rem 0 1.25rem;
  }

  /* 讓表格在小螢幕不擠壓，啟用水平捲動（不改 DOM） */
  .ranking-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 10px;
  }
  .ranking-table table {
    width: 100%;
  }
  .ranking-table thead th {
    white-space: nowrap;
  }
  .ranking-table tbody td {
    white-space: nowrap;
  }
  /* 若想視覺更緊湊 */
  .ranking-table th,
  .ranking-table td {
    padding: 0.75rem 0.85rem;
    font-size: 0.95rem;
  }

  .delete-icon {
    font-size: 1.1rem;
  }

  .pagination {
    gap: 0.35rem;
    margin-top: 1.25rem;
  }
  .pagination button {
    padding: 0.45rem 0.8rem;
    font-size: 0.95rem;
  }

  .modal-content {
    width: 90%;
    padding: 1.4rem;
    border-radius: 8px;
  }
  .close-button {
    padding: 0.55rem 1rem;
  }
}

/* 極小螢幕（≤ 480px）：再縮字與留白 */
@media (max-width: 480px) {
  .back-button {
    font-size: 1rem;
  }
  .reset-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.95rem;
  }

  .title {
    font-size: 1.45rem;
    margin-bottom: 1rem;
  }

  .ranking-table {
    border-radius: 8px;
  }
  .ranking-table th,
  .ranking-table td {
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
  }

  .pagination {
    gap: 0.3rem;
  }
  .pagination button {
    padding: 0.4rem 0.7rem;
    font-size: 0.9rem;
    border-radius: 5px;
  }

  .modal-content {
    width: 92%;
    padding: 1.2rem;
  }
  .close-button {
    padding: 0.5rem 0.9rem;
    font-size: 0.95rem;
  }
}

</style>