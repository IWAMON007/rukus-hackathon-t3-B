<template>
  <div class="text-section">
    <p>{{ msg }}</p>
  </div>
</template>

<script setup>
defineProps(["msg"])
</script>

<style scoped>
.text-section {
  margin-left: 3px;
  margin-top: 3px;
  height: 125px;
  width: 275px;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 13.5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  white-space: pre-wrap;
  text-align: left;
}

.text-section p {
  margin: 5px;
  padding: 0;
  width: auto;
  height: auto;
  line-height: 1.3;
}
</style>
