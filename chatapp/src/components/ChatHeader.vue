<template>
  <div class="chat-header">
    <p class="user-name">ログインユーザ：{{ loginUser.name }}</p>
    <h1 class="project-title">イニシャルB</h1>
    <router-link to="/" class="link">
      <button type="button" class="button-exit" @click="onExit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span class="exit-label"> Exit </span>
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { inject } from "vue"

const loginUser = inject("loginUser").value
const pushMsg = inject("pushMsg")
const MsgType = inject("MsgType")
const socket = inject("socket")

const onExit = () => {
  socket.emit("exitEvent", { user: loginUser }) // メッセージとともに送信
  // メッセージをローカルで表示
  pushMsg(loginUser, MsgType.EXIT, "")

  // 退室後はログイン画面に戻る
  router.push({ name: "login" })
}
</script>
<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: var(--header-color);
  color: var(--header-text-color);
  height: 60px;
  margin: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-name {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.project-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
}

.button-exit {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: var(--header-text-color);
  border-radius: 5px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.button-exit:hover {
  background-color: #444;
  color: #ff6666;
}
.button-exit svg {
  margin-right: 4px;
}
.exit-label {
  font-size: 14px;
  font-weight: bold;
}
</style>
