<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const handleScrollAnimation = () => {
  const scrollElements = document.querySelectorAll(".scroll-on")
  scrollElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top
    const isInView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 100
    if (isInView) {
      el.classList.add("scroll-on-active")
    }
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScrollAnimation)
  handleScrollAnimation()
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollAnimation)
})
</script>

<template>
  <div class="banner scroll-on">
    <img src="/assets/banner.png" alt="banner" class="banner-image" id="banner-image">
  </div>

  <div class="introduction-box scroll-on">

  </div>
</template>

<style scoped>
/* styles are imported from projects.css */
</style>
