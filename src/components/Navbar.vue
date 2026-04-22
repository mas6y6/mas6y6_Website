<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isScrolled = ref(false)
const isNavActive = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleNav = () => {
  isNavActive.value = !isNavActive.value
}

const navigateTo = (path) => {
  isNavActive.value = false
  router.push(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="nav" :class="{ 'scrolled': isScrolled }">
    <div class="nav-left">
      <img src="/assets/logo.png" alt="logo" class="nav-logo">
      <h3 class="nav-title">mas6y6</h3>
    </div>

    <button class="nav-toggle" :class="{ 'active': isNavActive }" @click="toggleNav" aria-label="toggle navigation">
      <span class="hamburger"></span>
    </button>

    <div class="nav-buttons" :class="{ 'active': isNavActive }">
      <button class="nav-button" @click="navigateTo('/')">Home</button>
      <button class="nav-button" @click="navigateTo('/projects')">Projects</button>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped styles can be added here, but we are using global CSS from index_old.html for now. */
</style>
