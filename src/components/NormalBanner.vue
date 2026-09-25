<script setup lang="ts">

</script>

<template>
  <div class="banner scroll-on">
    <img src="/assets/banner.png" alt="banner" class="banner-image">
  </div>
</template>

<style scoped lang="scss">
div.banner {
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  height: 60vh;

  position: relative;

  opacity: 1;
  transition: opacity 1s ease;

  &.scroll-on-active {
    img {
      opacity: 1;
      transform: translateY(0);
    }
  }

  img {
    opacity: 0;

    max-height: 150px;
    width: auto;

    transform: translateY(-20px);

    transition:
        transform 1s ease,
        opacity 1s ease;
  }
}

@media (max-width: 1400px) {
  div.banner {
    height: 25vh;

    img {
      max-height: 80px;
    }
  }
}

@media (max-width: 600px) {
  div.banner {
    height: 25vh;

    img {
      max-height: 60px;
    }
  }
}

@media (max-width: 400px) {
  div.banner {
    height: 25vh;

    img {
      max-height: 40px;
    }
  }
}
</style>