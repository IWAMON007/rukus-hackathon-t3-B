<template>
  <div class="input-container">
    <textarea
      ref="textarea"
      id="message"
      variant="outlined"
      placeholder="メッセージを入力してください。"
      rows="1"
      class="area"
      v-model="chatContent"
      @input="handleInput"
    ></textarea>
    <button class="send-button" @click="onPublish" :disabled="isButtonDisabled">
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
        class="feather feather-send"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, nextTick } from "vue"

// 変数定義
const chatContent = ref("")
const textarea = ref(null)
const socket = inject("socket")
const loginUser = inject("loginUser")

// 投稿ボタンの無効化フラグとタイマー
const isButtonDisabled = ref(false)
let timer = null

// テキストの投稿処理
const onPublish = () => {
  if (chatContent.value.trim() !== "" && !isButtonDisabled.value) {
    socket.emit("publishEvent", {
      user: loginUser.value,
      msg: chatContent.value,
    })
    // 入力欄を初期化
    
    isButtonDisabled.value = true
    setTimeout(() => {
        isButtonDisabled.value = false
    }, 60)
}
    chatContent.value = ""
    
  nextTick(() => {
    adjustHeight()
  })
}

const handleInput = () => {
  const el = textarea.value
  if (el) {
    const plainTextLength = chatContent.value.replace(/\n/g, "").length
    if (plainTextLength > 133) {
      chatContent.value = chatContent.value.slice(
        0,
        133 + (chatContent.value.match(/\n/g) || []).length,
      )
      alert("最大133文字まで入力可能です。")
    }

    const lines = chatContent.value.split("\n").map((line) => {
      return line.length > 19 ? line.match(/.{1,19}/g).join("\n") : line
    })
    chatContent.value = lines.join("\n")

    adjustHeight()

    const lineHeight = parseInt(getComputedStyle(el).lineHeight)
    const maxHeight = lineHeight * 7
    const currentLineCount = el.value.split("\n").length

    if (currentLineCount > 7) {
      chatContent.value = chatContent.value.slice(0, -1)
      alert("最大7行まで入力可能です。")
      chatContent.value = chatContent.value.split("\n").slice(0, 7).join("\n")
    }

    if (el.scrollHeight > maxHeight) {
      el.style.height = `${maxHeight}px`
      el.style.overflowY = "auto"
    } else {
      el.style.overflowY = "hidden"
    }
  }
}

const adjustHeight = () => {
  const el = textarea.value
  if (el) {
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }
}

onMounted(() => {
  adjustHeight()
})
</script>
<style scoped>
.input-container {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  justify-content: center;
}

.area {
  width: 80%;
  resize: none;
  overflow: hidden;
  line-height: 1.3;
  padding: 10px;
  box-sizing: border-box;
  font-size: 23px;
  letter-spacing: 0.1em;
  border: 1px solid #bda7a7;
  border-radius: 10px;
  margin-top: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #5e0b0b;
  white-space: pre-wrap;
  word-break: break-word;
  outline: none;
  box-shadow: border-color 0.2s ease;
}

.area::placeholder {
  color: #666;
}

.area:focus {
  border-color: #a45c5c;
}

.send-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.send-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.feather-send {
  width: 42px;
  height: 42px;
  stroke: #1f0e0e;
  stroke-width: 1.7;
  transition: stroke 0.2s ease;
}

.send-button:hover .feather-send {
  stroke: #512d66;
}
</style>
