<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Banner from '../components/Banner.vue'
import Introduction from '../components/Introduction.vue'
import Skills from '../components/Skills.vue'
import CoolPeople from '../components/CoolPeople.vue'
import Statistics from '../components/Statistics.vue'
import Socials from '../components/Socials.vue'
import BackToTop from '../components/BackToTop.vue'

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
  <Banner />
  <Introduction />
  <Skills />
  <CoolPeople />
  <Statistics />
  <Socials />
  <BackToTop />
</template>

<style scoped>
/* styles are imported from style.css */
</style>
