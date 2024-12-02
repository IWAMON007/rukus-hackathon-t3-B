<template>
  <ul class="horizontal-list">
    <li class="vertical-text el">種 類</li>
    <li
      v-for="(skill, index) in skillList"
      :key="index"
      class="vertical-text el skill"
      ref="skillsEl"
    >
      {{ skill }}
    </li>
  </ul>
</template>
<script setup>
import { onMounted, ref } from "vue"

const { skills } = defineProps(["skills"])
const skillList =
  skills.length >= 7
    ? skills.slice(0, 7)
    : [...skills, ...Array(7 - skills.length).fill("-")]

const adjustFontSize = () => {
  skillsEl.value.forEach((el) => {
    if (el) {
      // 初期のフォントサイズを設定
      let fontSize = 12
      el.style.fontSize = `${fontSize}px`

      // 要素の高さと幅を取得
      const elementHeight = el.clientHeight
      const elementWidth = el.clientWidth

      // テキストの高さと幅が要素の大きさに収まるまでフォントサイズを減少
      while (
        (el.scrollHeight > elementHeight || el.scrollWidth > elementWidth) &&
        fontSize > 5
      ) {
        fontSize -= 0.5
        el.style.fontSize = `${fontSize}px`
      }
    }
  })
}

// マウント時にフォントサイズを調整
onMounted(() => {
  adjustFontSize()
})

const skillsEl = ref([])
</script>
<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 12px;
}

.el {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 20px;
  margin: 0;
  border: 1px solid #000;
  box-sizing: border-box;
}

.skill {
  background-color: #f1d5ce;
  border-left: 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
}

.horizontal-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
