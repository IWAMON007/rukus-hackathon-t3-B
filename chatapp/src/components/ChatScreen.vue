<script setup>
import { inject, ref, reactive, onMounted, provide, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import socketManager from "../socketManager.js"

import ChatView from "./Chatview.vue"
import ChatHeader from "./ChatHeader.vue"
import InputText from "./InputText.vue"
import UserList from "./UserList.vue"

const route = useRoute()
const router = useRouter()
const socket = socketManager.getInstance()

// ユーザーネーム
const userName = ref(route.params.userName)

// チャットの管理
const chatList = reactive([])
//チャットエリアの参照
const view = ref(null)
// loginUser: App.vueでref
const loginUser = inject("loginUser").value

// メッセージタイプの列挙型
const MsgType = Object.freeze({
  PUBLISH: "publish", // 投稿
  ENTER: "enter", // 入室
  EXIT: "exit", // 退室
})

// provideの実行
provide("chatList", chatList)
provide("socket", socket)
provide("pushMsg", pushMsg)
provide("MsgType", MsgType)

// これでchatオブジェクトをchatListに詰め込む
function pushMsg(user, msgType, msg) {
  const createChatId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  const formatDate = () => {
    const date = new Date(Date.now())

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // 月は0から始まるので+1
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  chatList.push({
    user, // user: objectでユーザオブジェクト
    msgType, // msgType: MsgType列挙型でメッセージタイプ
    msg, // msg: string型でメッセージコンテンツ
    id: createChatId(), // id: string型でchatのID liのkeyプロパティに渡す
    timeStamp: formatDate(), // timeStamp: string型で、pushした時の時刻
    isMine: user.id === loginUser.id, // isMine: boolean型で自分のかどうか
  })

  nextTick(() => scrollToBottom())
}

function scrollToBottom() {
  if (view.value) {
    view.value.scrollTop = view.value.scrollHeight
  }
}

onMounted(() => {
  registerSocketEvent()
})

// サーバから受信したデータをロード
const onReceiveEnter = (data) => {
  pushMsg(data.newUser, MsgType.ENTER, "")
}

// サーバから受信した退室メッセージを受け取り画面上に表示する
const onReceiveExit = (data) => {
  pushMsg(data.user, MsgType.EXIT, "")
}

// サーバから受信した投稿メッセージを画面上に表示する
const onReceivePublish = (data) => {
  // data {user, msg}
  pushMsg(data.user, MsgType.PUBLISH, data.msg)
}
// #endregion

// #region local methods
// イベント登録をまとめる
const registerSocketEvent = () => {
  // 入室イベントを受け取ったら実行
  socket.on("enterEvent", (data) => {
    onReceiveEnter(data)
  })

  // 退室イベントを受け取ったら実行
  socket.on("exitEvent", (data) => {
    onReceiveExit(data)
  })

  // 投稿イベントを受け取ったら実行
  socket.on("publishEvent", (data) => {
    onReceivePublish(data)
  })
}
// #endregion
</script>

<template>
  <div class="container">
    <!-- ヘッダー -->
    <header class="header">
      <chat-header></chat-header>
    </header>

    <!-- コンテンツエリア -->
    <main class="content">
      <aside class="user-list">
        <user-list></user-list>
      </aside>

      <chat-view ref="view"></chat-view>
    </main>
    <!-- 入力エリアをフッターとして配置 -->
    <footer class="input-area">
      <input-text></input-text>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--primary-color);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  /* background-color: #333; */
  padding: 10px;
  color: white;
  z-index: 10;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 60px;
}

.user-list {
  flex: 0 0 20%;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.chat-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  padding: 60px 10% 140px 10%;
  justify-content: flex-start;
}

.input-area {
  justify-content: center;
  padding: 15px;
  position: fixed;
  bottom: 0;
  right: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  box-sizing: border-box;
  background-color: var(--input-area-color);
}
</style>
