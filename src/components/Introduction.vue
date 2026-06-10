<script setup>
  import {computed, ref} from "vue";
  import { useMouseInElement } from '@vueuse/core'

  const icon = ref(null);
  const mouseIn = useMouseInElement(icon);

  const rotationTransform = computed(() => {
    const MAX_ROTATION = 20;

    const rX = (
        MAX_ROTATION / 2 -
        (mouseIn.elementY.value / mouseIn.elementHeight.value) * MAX_ROTATION
    ).toFixed(2);

    const rY = (
        (mouseIn.elementX.value / mouseIn.elementHeight.value) * MAX_ROTATION -
        MAX_ROTATION / 2
    ).toFixed(2);

    return mouseIn.isOutside.value ? '' : `perspective(${mouseIn.elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
  })
</script>
<template>
  <div class="introduction-box scroll-on">
    <img
        src="/assets/logo.png" alt="logo" ref="icon"
        v-bind:style="{ transform: rotationTransform, transition: 'transform 0.25s ease-out' }"
    >
    <div class="text-content">
      <h1>Hi</h1>
      <p>I'm mas6y6.<br/>
        A young software developer that loves to make things exist.<br/>
        I have a strong passion with technology and anything software related.
      </p>
    </div>
  </div>
</template>
