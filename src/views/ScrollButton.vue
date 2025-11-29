<template>
  <div class="scroll-buttons">
    <button
      v-show="showTop"
      class="scroll-button up"
      @click="scrollToTop"
    >
      ↑
    </button>
    <button
      v-show="showBottom"
      class="scroll-button down"
      @click="scrollToBottom"
    >
      ↓
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const showTop = ref(false)
const showBottom = ref(true)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight

  // Show top button if scrolled down
  showTop.value = scrollY > 200

  // Hide bottom button if near the bottom
  showBottom.value = scrollY + windowHeight < docHeight - 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // initialize
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-buttons {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.scroll-button {
  background-color: rgba(53, 73, 94, 0.8); /* semi-transparent */
  color: #00bd7e;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease, opacity 0.3s ease;
  opacity: 0.7; /* default transparency */
}

.scroll-button:hover {
  background-color: rgba(0, 189, 126, 0.9); /* brighter on hover */
  color: #35495e;
  opacity: 1; /* fully visible on hover */
}

/* 📱 Mobile adjustments */
@media (max-width: 550px) {
  .scroll-button {
    width: 36px;
    height: 36px;
    font-size: 16px;
    right: 12px;
    bottom: 12px;
    opacity: 0.6; /* slightly more transparent on mobile */
  }

  .scroll-buttons {
    gap: 8px;
  }
}
</style>
