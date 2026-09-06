<script setup lang="ts">
import {onMounted, ref} from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value!;

});

</script>

<template>
  <div class="background">
      <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
  .background {
    width: 100%;
    min-height: 100vh;
    background-color: #000000;
    z-index: -1;
    position: fixed;
  }
</style>