<script setup lang="ts">
  const props = defineProps<{
    backgroundImage: string;
    borderColor: string;
  }>();
</script>

<template>
  <div class="customizeableBox scroll-on" :style="{ backgroundImage: `${props.backgroundImage}`, borderColor: props.borderColor }">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  /*
    linear-gradient(
        to top,
        rgba(0, 51, 255, 0.27),
        #100017
    )

     #0033ff
  */

  div.customizeableBox {
    box-sizing: border-box;
    width: 90%;
    margin: 5%;
    padding: 50px;
    border-radius: 15px;

    border: 1px solid;

    opacity: 0;
    transform: translateY(50px);

    transition: 1s ease;

    &.scroll-on-active {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>