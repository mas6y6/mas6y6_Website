<script setup lang="ts">
  import {computed, ref} from "vue";
  import { useMouseInElement } from '@vueuse/core'

  const icon = ref<HTMLElement | null>(null);
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
      <h1>Hello There! 👋</h1>
      <div>
        <p>
          I'm <strong>mas6y6</strong>!<br/>
          I am a software developer that loves to work on anything software related or anything that involves technology.<br/>
          I have a <strong>strong</strong> passion with technology and anything software related.<br/>
        </p>
        <hr/>
        <p>
          Or really to make anything I want exist.
        </p>
      </div>
    </div>
  </div>
</template>
