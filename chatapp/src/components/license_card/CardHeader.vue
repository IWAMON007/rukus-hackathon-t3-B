<template>
  <header class="card-header">
    <div class="tag">氏名</div>
    <div class="user-name">{{ userName }}</div>
    <div class="time-stamp">{{ timeStamp }}</div>
  </header>
</template>

<script setup>
defineProps(["userName", "timeStamp"])
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  border: 1px solid #000;
  border-radius: 20px;
  padding: 0 8px;
  width: 380px;
  height: 25px;
  position: relative;
  box-sizing: border-box;
}

.tag {
  font-size: 12px;
  margin-left: 0;
  position: relative;
  padding-right: 4px;
}
.tag::after {
  content: "";
  position: absolute;
  right: -4px;
  top: -3px;
  width: 1px;
  bottom: -3px;
  background-color: #000;
}

.user-name {
  font-size: 12px;
  letter-spacing: 12px;
  position: relative;
  padding: 0 10px;
  flex-grow: 1;
  text-align: center;
}

.time-stamp {
  position: relative;
  font-size: 12px;
  margin-right: 0;
  padding-left: 2px;
}

.time-stamp::before {
  content: "";
  position: absolute;
  left: -4px;
  top: -4px;
  width: 1px;
  bottom: -4px;
  background-color: #000;
}
</style>
