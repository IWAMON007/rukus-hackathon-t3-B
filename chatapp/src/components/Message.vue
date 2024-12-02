<template>
  <li v-if="msgType === MsgType.PUBLISH">
    <license-card
      :userName="user.name"
      :userId="user.id"
      :imgPath="user.imagePath"
      :isglasses="user.isglasses"
      :isManual="user.isManual"
      :msg="msg"
      :timeStamp="timeStamp"
      :skills="user.skills"
      :class="[{ mine: isMine, others: !isMine }]"
    ></license-card>
  </li>
  <li v-else-if="msgType === MsgType.ENTER" class="center">
    <Enter :userName="user.name"></Enter>
  </li>
  <li v-else-if="msgType === MsgType.EXIT" class="center">
    <Exit :userName="user.name"></Exit>
  </li>
</template>

<script setup>
import Exit from "./Exit.vue"
import Enter from "./Enter.vue"
import LicenseCard from "./license_card/LicenseCard.vue"
import { inject } from "vue"
const { id, msg, isMine, msgType, user, timeStamp } = defineProps([
  "id",
  "msg",
  "isMine",
  "msgType",
  "user",
  "timeStamp",
])

const MsgType = inject("MsgType")
</script>

<style scoped>
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

li.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.mine {
  margin-bottom: 30px;
  margin-left: auto;
}

.others {
  margin-right: auto;
  margin-bottom: 30px;
}
</style>
