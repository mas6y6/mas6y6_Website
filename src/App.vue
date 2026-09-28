<script setup lang="ts">
import Navbar from './router/Navbar.vue'
import Footer from './components/Footer.vue'
import Background from "./components/Background.vue";
import ModalHolder from "./components/modal/ModalHolder.vue";
import {onMounted} from "vue";

onMounted(() => {
  window.scrollTo(0,0)
});
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