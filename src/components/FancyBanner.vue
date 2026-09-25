<script setup lang="ts">
import { ref, onMounted } from "vue";
import BannerText from "./BannerText.vue";

const emit = defineEmits<{ shrunk: [] }>()
const visible = ref(false)
const shrunk = ref(false)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 200))

  visible.value = true

  await new Promise(resolve => setTimeout(resolve, 500))

  shrunk.value = true

  await new Promise(resolve => setTimeout(resolve, 450))

  emit("shrunk")
})
</script>

<template>
  <div
      class="banner"
      :class="{
      'banner-visible': visible,
      'banner-shrunk': shrunk
    }"
  >
    <div class="banner-content">
      <div class="banner-reveal"></div>

      <BannerText />
    </div>
  </div>
</template>