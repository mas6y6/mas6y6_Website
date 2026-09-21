<script setup lang="ts">
interface Props {
  name: string
  icon: string
  link: string
  blackText: boolean
  cssclass: string
}

const props = defineProps<Props>()
</script>

<template>
  <a
      class="software-icon"
      :id="props.cssclass"
      :href="props.link"
      target="_blank"
      rel="noopener noreferrer"
  >
    <img :src="props.icon" :alt="props.name" />
    <p :class="{ 'black-text': props.blackText }">
      {{ props.name }}
    </p>
  </a>
</template>