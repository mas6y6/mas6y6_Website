<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Banner from '../components/Banner.vue'
import Introduction from '../components/boxes/Introduction.vue'
import Skills from '../components/boxes/Skills.vue'
import CoolPeople from '../components/boxes/CoolPeople.vue'
import Statistics from '../components/boxes/Statistics.vue'
import Socials from '../components/boxes/Socials.vue'
import BackToTop from '../components/BackToTop.vue'
import Software from "../components/boxes/Software.vue";

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
  <Software />
  <CoolPeople />
  <Statistics />
  <Socials />
  <BackToTop />
</template>

<style scoped>
</style>
