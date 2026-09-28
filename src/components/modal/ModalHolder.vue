<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {modalStore} from "../../stores/modalStore.ts";

const store = modalStore();
</script>

<template>
  <Transition name="modal">
    <div v-if="store.modal" class="model-holder">
      {{ store.modal }}
    </div>
  </Transition>
</template>

<style scoped>

.model-holder {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  background-color: rgba(0, 0, 0, 0.5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

kbd {
  padding: 3px 7px;
  border-radius: 5px;

  background: #eee;
  border: 1px solid #ccc;

  font-family: monospace;
  font-weight: bold;
}
</style>