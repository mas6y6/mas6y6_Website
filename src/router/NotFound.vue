<script setup lang="ts">
import {onMounted, ref} from "vue";

  const box = ref<HTMLDivElement | null>(null);
  const funnyMessage = ref<string>("");

  onMounted(() => {
    requestAnimationFrame(() => {
      box.value?.classList.add("scroll-on-active");
    });

    let ran = Math.floor(Math.random() * 3 );

    if ( ran === 0 ) {
      funnyMessage.value = "The real question is how did you get here??!"
    } else if ( ran === 1 ) {
      funnyMessage.value = "You should check out <a href='https://www.parafieldstudios.com'>Parafield studios</a>"
    } else if ( ran === 2 ) {
      funnyMessage.value = "I hope you realise this is a just a Vue app. any secret URL's aren't here lol."
    }
  })
</script>

<template>
  <div class="outside">
    <div class="not-found" ref="box">
      <h1>404</h1>
      <p>
        Lol the page you tried to find does not exist.<br>
        Maybe try going back to the <router-link to="/">home page</router-link>?
      </p>
      <p class="smallfunny" v-html="funnyMessage">
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.outside {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.not-found {
  width: calc(50% - 5% - 5%);
  margin: 5%;
  padding: 50px;
  border-radius: 15px;
  background-image: linear-gradient(to top, rgba(85, 0, 255, 0.27), #100017);
  border-width: 1px;
  border-style: solid;
  border-color: #5500ff;
  height: 80vh;
  opacity: 0;
  transform: translateY(50px);

  transition: 1s ease;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  &.scroll-on-active {
    transform: translateY(0);
    opacity: 1;
  }

  .smallfunny {
    margin-top: 3rem;
    font-size: .7rem;
  }
}


</style>