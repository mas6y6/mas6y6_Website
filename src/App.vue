<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Background from "./components/Background.vue";
import ModalHolder from "./components/ModalHolder.vue";
</script>

<template>
  <ModalHolder />
  <Background />
  <Navbar />
  <div>
    <router-view></router-view>
  </div>
  <Footer />
</template>