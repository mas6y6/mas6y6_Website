<script setup lang="ts">
  import {modalStore} from '../stores/modalStore';

  const store = modalStore();
</script>

<template>
  <div class="model-holder">
    {{ store.modal }}
  </div>
</template>

<style scoped>

</style>