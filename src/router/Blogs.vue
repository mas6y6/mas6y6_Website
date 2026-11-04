<script setup lang="ts">
import NormalBanner from "../components/banner/NormalBanner.vue";
import CustomizeableBox from "../components/CustomizeableBox.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {useRoute} from "vue-router";
import LoadingSpinner from "../components/LoadingSpinner.vue";
const route = useRoute()
const blogsLoaded = ref<Boolean>(false)
const blogs = ref<Array<any>>([])

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
  <NormalBanner height="40vh" />
  <CustomizeableBox background-image="linear-gradient(
        to top,
        rgba(0, 51, 255, 0.27),
        #100017
    )" border-color="#0033ff">
    <div v-if="!blogsLoaded">
      <loading-spinner></loading-spinner>
    </div>
    <div v-if="blogsLoaded">
      <div v-for="blog of blogs">

      </div>
    </div>
  </CustomizeableBox>
</template>

<style scoped lang="scss">

</style>