<script setup lang="ts">
import { useAssetLoader } from "../composables/useAssetLoader";
import { isReady } from "../composables/useAssetLoader";
import LoadingSpinner from "./LoadingSpinner.vue";

const { isLoading } = useAssetLoader();

const handleAfterLeave = () => {
  isReady.value = true;
};
</script>

<template>
  <Transition name="loading-fade" @after-leave="handleAfterLeave">
    <div
      v-if="isLoading"
      class="loading-screen"
      @wheel.prevent
      @touchmove.prevent
    >
      <div class="loading-content">
        <LoadingSpinner />
        <p class="loading-text">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.45s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>