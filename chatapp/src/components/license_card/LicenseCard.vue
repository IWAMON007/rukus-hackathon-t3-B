<template>
  <div class="card-container">
    <card-header
      class="header"
      :userName="userName"
      :timeStamp="timeStamp"
    ></card-header>
    <main class="license-content">
      <text-section class="text" :msg="msg"></text-section>
      <p class="license-title">運<br />転<br />免<br />許<br />証</p>
      <photo-section class="photo" :imgPath="imgPath"></photo-section>
      <p class="produced-by">テックラボ<br />公安委員会</p>
      <p class="number-tag">番 号</p>
      <hr class="vertical-line" />
      <hr class="horizontal-line" />
      <p class="id-box">
        第 <strong class="user-id">{{ userId }}</strong> 号
      </p>
      <p class="condition-tag">免許の<br />条件等</p>
      <div class="license-type">
        <div v-if="isglasses">
          眼鏡等
        </div>
        <div v-if="!isManual">
        普通車はAT車に限る
      </div>
      </div>
      <skill-list class="skills" :skills="skills"></skill-list>
    </main>
  </div>
</template>
<script setup>
import CardHeader from "./CardHeader.vue"
import TextSection from "./TextSection.vue"
import PhotoSection from "./PhotoSection.vue"
import SkillList from "./SkillList.vue"


const { userName, imgPath, userId, isglasses, transmissionType, msg, timeStamp, skills } =
  defineProps(["userName", "imgPath", "userId", "isglasses", "isManual", "msg", "timeStamp", "skills"])
</script>

<style scoped>
* {
  font-family: "Inter", sans-serif;
}

.card-container {
  position: relative;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  width: 400px;
  height: 270px;
  padding: 0;
  font-family: "Inter", sans-serif;
}

.header {
  margin: 0;
  position: absolute;
  left: 10px;
  top: 6px;
}

.license-content {
  border: 1px solid #000;
  border-radius: 10px;
  margin: 0;
  width: 380px;
  height: 229px;
  position: absolute;
  left: 10px;
  bottom: 6px;
}

.license-title {
  position: absolute;
  right: 82px;
  top: 5px;
  width: 17px;
  height: 106px;
  color: #4d90e0;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
}

.produced-by {
  position: absolute;
  top: 115px;
  right: 19px;
  margin: 0;
  padding: 0;
  font-size: 10px;
  width: 50px;
  height: 24px;
  color: #ce624c;
}

.number-tag {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 134px;
  left: 9px;
  font-size: 12px;
  width: 36px;
  height: 15px;
}

.vertical-line {
  position: absolute;
  bottom: 0;
  left: 53px;
  width: 1px;
  height: 98px;
  background-color: #000;
  border: none;
  margin: 0;
}

.horizontal-line {
  position: absolute;
  bottom: 47px;
  left: 26px;
  height: 53px;
  width: 1px;
  transform: rotate(90deg);
  background-color: #000;
  border: none;
  margin: 0;
}

.id-box {
  position: absolute;
  bottom: 79px;
  left: 55px;
  width: 224px;
  height: 17px;
  padding: 0;
  margin: 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-id {
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.2rem;
}

.condition-tag {
  position: absolute;
  left: 9px;
  bottom: 25px;
  font-size: 12px;
  height: 30px;
  width: 36px;
  padding: 0;
  margin: 0;
}

.license-type {
  position: absolute;
  bottom: 21px;
  left: 58px;
  width: 112px;
  height: 34px;
  padding: 0;
  margin: 0;
  font-size: 12px;
  text-align: left;
}
.skills {
  position: absolute;
  bottom: 3px;
  right: 18px;
}
</style>
