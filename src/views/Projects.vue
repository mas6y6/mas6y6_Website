<script setup>
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
    <div class="text-content">
      <h1>Projects</h1>
      <p>This is my projects section where I post my projects and things and mainly the stuff I work on.</p>
      <hr>
      <p>Right now it's empty since I mainly help out <a href="https://www.parafieldstudios.com">Parafield Studios</a> at the moment. But I do work on my own projects, though.</p>
      <p>I'll put them here once I am ready :3</p>
    </div>
  </div>
</template>

<style scoped>
/* styles are imported from projects.css */
</style>
