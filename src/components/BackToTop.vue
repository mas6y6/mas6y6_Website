<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
</script>

<template>
  <button class="back-to-top-btn" id="back-to-top" type="button" @click="scrollToTop">
    Back to top
  </button>
</template>
