<script setup>
// ログインの方からユーザリストをもらってレンダリング
import { inject, computed } from "vue"

const loginUser = inject("loginUser").value
const userList = inject("userList")

const filteredUserList = computed(() => {
  return userList.filter((user) => user.id !== loginUser.id)
})
</script>
<template>
  <div class="user-list-container">
   <div class="online-status">
     オンライン　- {{ filteredUserList.length }}
   </div>

    <ul class="user-list">
      <li v-for="{ name, id, imagePath } in filteredUserList" :key="id" class="user-item">
        <img :src="imagePath" alt="user-icon" class="user-icon" />
        <span class="user-name">{{ name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.user-list-container {
  background-color: var(--sidebar-color);
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
}

.online-status {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
  background-color: #514D4D;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 12px;
  padding-left: 20px;
  margin-bottom: 5px;
  border-radius: 4px;
  background-color: #f1d5ce;
  color: var(--userlist-text-color);
  cursor: pointer;
  border: 1px solid rgba(33,33,33, 0.2);
  transition:
    background-color 0.2s,
    color 0.2s,
    opacity 0.2s;
}

.user-list li:hover {
  background-color: #c4b4b4;
}

.user-icon {
  width: 32px;
  height: 32px;
  border-radius: 25%;
  margin-right: 10px;
  object-fit: cover;
}

.user-name {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #333;
}
</style>
