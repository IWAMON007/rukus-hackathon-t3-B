<template>
  <p class="enter-msg">{{ userName }}さんの免許が発行されました</p>
</template>

<script setup>
const { userName } = defineProps(["userName"])
</script>
<style scoped>
.enter-msg {
  padding: 0;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 56px;
  width: 417px;
  border: 1px solid #000;
  border-radius: 100px;
}
</style>
