<script setup>
import { provide, reactive, ref } from "vue"

// #region reactive state

const loginUser = ref({})
const userName = ref("")
const userList = reactive([])
// #endregion

provide("userName", userName)
provide("userList", userList)
provide("loginUser", loginUser)
// #endregion
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --primary-color: rgba(5, 0, 255, 0.2); /* チャットの背景色 */
  --sidebar-color: #d5c8c8;
  --userlist-text-color: #333;
  --input-area-color: #f4d8d8;
  --header-color: #333;
  --header-text-color: #ffffff;
}
</style>
