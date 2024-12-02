<script setup>
defineProps(["imgPath"])
</script>

<template>
  <div class="photo-section">
    <img :src="imgPath" alt="shib" />
  </div>
</template>
<style scoped>
.photo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 110px;
  background-color: #e0f0ff;
  overflow: hidden;
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 10px;
  border: 1px solid #000;
}

.photo-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
