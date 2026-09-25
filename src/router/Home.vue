<script setup lang="ts">
import FancyBanner from '../components/FancyBanner.vue'
import Introduction from '../components/boxes/Introduction.vue'
import Skills from '../components/boxes/Skills.vue'
import CoolPeople from '../components/boxes/CoolPeople.vue'
import Statistics from '../components/boxes/Statistics.vue'
import Socials from '../components/boxes/Socials.vue'
import BackToTop from '../components/BackToTop.vue'
import Software from "../components/boxes/Software.vue";
import {onMounted, onUnmounted} from "vue";

const revealed = new Set<Element>()
let unlockTimer: number | undefined

const lockScroll = () => {
  document.documentElement.style.overflow = "hidden"
  document.body.style.overflow = "hidden"
}

const unlockScroll = () => {
  document.documentElement.style.overflow = ""
  document.body.style.overflow = ""
}

const handleScrollAnimation = () => {
  const scrollElements = document.querySelectorAll(".scroll-on")
  scrollElements.forEach((el) => {
    if (revealed.has(el)) return
    const elementTop = el.getBoundingClientRect().top
    const isInView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 100
    if (isInView) {
      el.classList.add("scroll-on-active")
      revealed.add(el)
    }
  })
}

const handleBannerShrunk = () => {
  handleScrollAnimation()
  if (unlockTimer) clearTimeout(unlockTimer)
  unlockTimer = window.setTimeout(unlockScroll, 50)
}

onMounted(() => {
  lockScroll()
  window.addEventListener("scroll", handleScrollAnimation)
  handleScrollAnimation() // Initial check
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollAnimation)
  document.documentElement.style.overflow = ""
  document.body.style.overflow = ""
})

</script>

<template>
  <FancyBanner @shrunk="handleBannerShrunk" />
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
