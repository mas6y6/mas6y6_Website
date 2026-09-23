<!-- https://openbackgrrounds.com -->

<template>
  <div ref="holderRef" class="absolute inset-0 pointer-events-none">
    <canvas ref="canvasRef" class="block" />
  </div>
</template>

<script setup>

</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
}
</style>
