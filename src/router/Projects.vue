<script setup lang="ts">
import NormalBanner from "../components/NormalBanner.vue";
import {onMounted, onUnmounted} from "vue";
import CustomizeableBox from "../components/CustomizeableBox.vue";

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
  <NormalBanner />
  <CustomizeableBox background-image="linear-gradient(
        to top,
        rgba(0, 51, 255, 0.27),
        #100017
    )" border-color="#0033ff">
      <h1>Projects</h1>
      <h2>Organizations</h2>

  </CustomizeableBox>
</template>

<style scoped>
</style>