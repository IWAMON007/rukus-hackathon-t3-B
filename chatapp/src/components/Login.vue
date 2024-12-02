<script setup>
import { inject, ref } from "vue"
import { useRouter } from "vue-router"
import socketManager from "../socketManager.js"

// #region global state

const userList = inject("userList")
const userName = ref("")
const imagePath = ref("/cat.png")
const isglasses = ref(false)
const isManual = ref(false)

const skills = ref([
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "Rust",
  "Ruby",
  "Go",
  "PHP",
  "Swift",
])
const selectedSkills = ref([])

// #endregion

// #region local variable
const router = useRouter()
const socket = socketManager.getInstance()
// #endregion

const loginUser = inject("loginUser")
// #region browser event handler
// 入室メッセージをクライアントに送信する
const onEnter = () => {
  if (userName.value.trim() === "") {
    alert("ユーザーネームを入力してください")
    return
  }

  if (imagePath.value === "") {
    alert("画像を選択してください")
    return
  }

  const newUser = {
    name: userName.value,
    imagePath: imagePath.value,
    isglasses: isglasses.value,
    isManual: isManual.value,
    skills: selectedSkills.value,
    id:
      Date.now().toString().slice(0, 8) +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0"),
  }

  console.log(newUser)

  // サーバーにユーザー追加をリクエストし、応答を待つ
  socket.emit("enterEvent", newUser, (response) => {
    if (response.success) {
      loginUser.value = newUser
      router.push({ name: "chat-screen", params: { userName: newUser.name } })
    } else {
      alert(response.message) // ユーザー名が重複している場合
    }
  })
}

// ソケットからのユーザーリスト更新を受け取る
socket.on("updateUserList", (newUserList) => {
  userList.splice(0, userList.length, ...newUserList)
})
</script>

<template>
  <header class="header">
    <p class="headerTitle">テックラボChatルームへようこそ</p>
  </header>
  <section class="loginOverall">
    <div class="loginContainer">
      <h1 class="loginTitle">ログイン</h1>
      <div class="tableContiner">
        <span class="tableTopName">テックラボ公安委員会 . イニシャルB 殿</span>
        <table class="styled-table">
          <tr>
            <td><label for="username">ユーザー名:</label></td>
            <td>
              <input
                id="username"
                type="text"
                v-model="userName"
                placeholder="ユーザー名を入力"
              />
            </td>
          </tr>
          <tr>
            <td><label for="imagePath">証明写真:</label></td>
            <td>
              <select id="imgPath" v-model="imagePath">
                <option value="/cat.png">ねこ</option>
                <option value="/fox.png">きつね</option>
                <option value="/giraffe.png">キリン</option>
                <option value="/lion.png">ライオン</option>
                <option value="/owl.png">フクロウ</option>
                <option value="/penguin.png">ペンギン</option>
                <option value="/shibainu-sunglass.png">柴犬サングラス</option>
                <option value="/shibainu.png">柴犬</option>
                <option value="/tiger.png">タイガー</option>
                <option value="/zebra.png">シマウマ</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label for="isglasses">眼鏡</label></td>
            <td>
              <div class="manualFlex">
                <label>
                  <input
                    type="checkbox"
                    id="isglasses"
                    v-model="isglasses"
                    class="manual-checkbox"
                    size="10"
                  />
                </label>
                <p class="manualMessage">
                  *眼鏡をつけている場合はチェックをつけてください
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td><label for="isManual">マニュアル</label></td>
            <td>
              <div class="manualFlex">
                <label>
                  <input
                    type="checkbox"
                    id="isManual"
                    v-model="isManual"
                    class="manual-checkbox"
                    size="10"
                  />
                </label>
                <p class="manualMessage">*MTの場合はチェックをつけてください</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="skills">スキルを選択してください(最大7つ):</label>
            </td>
            <td>
              <div
                v-for="skill in skills"
                :key="skill"
                style="display: flex; gap: 10px"
              >
                <div>
                  <input
                    type="checkbox"
                    :id="skill"
                    :value="skill"
                    v-model="selectedSkills"
                    :disabled="
                      selectedSkills.length >= 7 &&
                      !selectedSkills.includes(skill)
                    "
                  />
                </div>
                <label :for="skill">{{ skill }}</label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="buttonContainer">
        <button type="button" @click="onEnter" class="button-normal">
          入室する
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--header-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.headerTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
.loginOverall {
  background-color: var(--sidebar-color);
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.loginContainer {
  width: 45%;
  height: calc(100vh - 10%);
  margin-top: 15vh;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 5vh;
}
.loginTitle {
  font-size: 2rem;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 60px;
}
.tableContiner {
  position: relative;
  margin-bottom: 40px;
}
.tableTopName {
  position: absolute;
  top: -25px;
  left: 15px;
}
.styled-table {
  width: 98%;
  margin: 0 auto;
  border-collapse: collapse;
}
.styled-table td {
  border: 1px solid black;
  padding: 10px;
}
.styled-table label {
  display: block;
  text-align: center;
}
.styled-table input[type="text"],
.styled-table input[type="checkbox"] {
  width: 100%;
  box-sizing: border-box;
}

.manualFlex,
.skill-flex {
  display: flex;
  align-items: baseline;
  text-align: left;
  align-self: center;
}

.manualFlex {
  gap: 10px;
}

.manualMessage {
  font-size: 10px;
}

/* .styled-table input[type="checkbox"][data-v-47199182]{
  width: 30%;
} */

.skills-cell {
  text-align: left;
}

.skillbox {
  margin-right: 8px;
  vertical-align: middle;
}

.skills-cell div {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.skills-cell {
  height: 250px;
  vertical-align: top;
}
.skills-cell input[type="text"] {
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  vertical-align: top;
  line-height: normal;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5ch;
}
.button-normal {
  background-color: rgb(67, 147, 200);
  color: #fff;
  border: none;
  width: 40%;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
}
.user-name-text {
  width: 200px;
  border: 1px solid #888;
  margin-bottom: 16px;
}
</style>
