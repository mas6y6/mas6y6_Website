<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";

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
  handleScrollAnimation() // Initial check
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollAnimation)
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>