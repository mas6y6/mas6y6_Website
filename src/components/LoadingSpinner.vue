<script setup lang="ts">
</script>

<template>
  <div class="loading-spinner" role="status" aria-label="Loading"></div>
</template>

<style scoped>
.loading-spinner {
  width: 52px;
  height: 52px;
  border: 4px solid rgba(255, 255, 255, 0.12);
  border-top-color: #9b59ff;
  border-right-color: #5500ff;
  border-radius: 50%;
  animation: loading-spin 0.85s linear infinite;
  box-shadow: 0 0 18px rgba(85, 0, 255, 0.35);
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>