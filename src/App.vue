<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Background from "./components/Background.vue";
</script>

<template>
  <Background />
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>