<script setup lang="ts">
import NormalBanner from "../components/banner/NormalBanner.vue";
import {onMounted, onUnmounted} from "vue";
import CustomizeableBox from "../components/CustomizeableBox.vue";

const handleScrollAnimation = () => {
  const scrollElements = document.querySelectorAll(".scroll-on")
  scrollElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top
    const isInView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 100
    if (isInView) {
      el.classList.add("scroll-on-active")
    }
  })
}

onMounted(() => {
  window.addEventListener("scroll", handleScrollAnimation)
  handleScrollAnimation()
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollAnimation)
})

function openLink(url: string) {
  window.open(url)
}
</script>

<template>
  <NormalBanner height="40vh" />
  <CustomizeableBox background-image="linear-gradient(
        to top,
        rgba(0, 51, 255, 0.27),
        #100017
    )" border-color="#0033ff">
    <h1>Organizations</h1>
    <p>These here are organizations that I are a part of.</p>

    <hr style="margin: 3rem;">

    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="org-box scroll-on" id="parafield" @click="openLink('https://parafieldstudios.com/')">
        <img id="parafield" src="/assets/orgs/parafield.svg" alt="Parafield Logo" class="scroll-on">
        <div class="internal">
          <h1>Parafield Studios</h1>
          <p>The team at Parafield Studios is amazing to work with. They're talented, friendly, and genuinely a lot of fun to be around.</p>
          <p>Parafield Studios specializes in creating high-quality video games and software, combining creativity with a strong passion for what they do.</p>
        </div>
      </div>

      <div class="org-box scroll-on" id="hypereclipse" @click="openLink('https://discord.gg/dayFUkc3ys')">
        <img id="hypereclipse" src="/assets/orgs/hypereclipse.svg" alt="HyperEclipse Interactive logo" class="scroll-on">
        <div class="internal">
          <h1>HyperEclipse Interactive</h1>
          <p>HyperEclipse Interactive is more of a close-knit group of friends who enjoy making games with Roblox and Godot.</p>
          <p>While HyperEclipse Interactive is smaller than Parafield, I still really enjoy working with them.</p>
          <p>( temp link for discord since i am building their website lol 👍 )</p>
        </div>
      </div>
    </div>

    <hr style="margin: 3rem;">

    <h1>Projects</h1>
    <p>Here are some of the personal projects I've worked on over the years.</p>
    <p>I enjoy building all kinds of things, from games and desktop applications to websites and Minecraft mods.</p>

    <h2>General Projects</h2>

    <p>These are a collection of projects that I've worked on that </p>

    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="project-box scroll-on musmeta-project" @click="openLink('https://github.com/mas6y6/MusMeta')">
        <img src="/assets/projects/MusMetaLogo.png" alt="MusMeta" class="scroll-on">
        <div class="internal">
          <h1>MusMeta</h1>
          <p>MusMeta is a all-in-one music metadata editing tool to allow you to edit music metadata in a variety of formats.</p>
          <p>( Right now it redirects to the github but I do plan to add a website soon! )</p>
        </div>
      </div>
    </div>

    <h2>Minecraft Development</h2>

    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="project-box scroll-on create-mod-project" @click="openLink('https://modrinth.com/mod/create-configurables')">
        <img src="/assets/projects/CreateConfigurables.png" alt="MusMeta" class="scroll-on">
        <div class="internal">
          <h1>Create Configurables</h1>
          <p>Create Configurables is a mod that allows you to configure the recipe that is used for the Crushing Wheels, Millstone, and the Item Drain!</p>
        </div>
      </div>
    </div>
  </CustomizeableBox>
</template>

<style scoped lang="scss">

div.project-box {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 30px;
  border-radius: 15px;

  --background-image: linear-gradient(to top, rgba(85, 0, 255, 0.27), #100017);
  --border-color: rgba(85, 0, 255);

  background-image: var(--background-image);
  border: 1px solid;
  border-color: var(--border-color);

  img {
    width: 8%;
    height: auto;
    object-fit: contain;
    opacity: 0;
    transform: translateX(-50px);

    &.scroll-on-active {
      opacity: 1;
      transform: translateX(0px);
    }

    transition: 1s ease;
  }

  & div.internal {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    p {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }

  transition: 0.5s ease;

  &.create-mod-project {
    --background-image: linear-gradient(to top, rgb(0 92 131), #00a8ff);
    --border-color: rgb(0 167 253);
  }

  &.musmeta-project {
    --background-image: linear-gradient(to top, rgb(253 121 139), #fdb94a);
    --border-color: rgb(251 184 73);
  }
}

@media (max-width: 1000px) {
  div.project-box {
    flex-direction: column;
    align-items: center;

    img {
      width: 40%;
    }

    gap: 10px;
  }
}

/*


Space because my head hurts.


*/

div.org-box {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
  border-radius: 15px;

  --background-image: linear-gradient(to top, rgba(85, 0, 255, 0.27), #100017);
  --shadow-color: rgba(0, 0, 0, 0.2);
  --border-color: rgba(85, 0, 255);

  background-image: var(--background-image);
  border: 1px solid;
  border-color: var(--border-color);

  img {
    width: 10%;
    height: auto;
    object-fit: contain;

    &#parafield {
      opacity: 0;
      transform: rotate(180deg);

      &.scroll-on-active {
        opacity: 1;
        transform: rotate(0deg);
      }

      transition: 1s ease;
    }

    &#hypereclipse {
      opacity: 0;
      transform: translateX(-50px);

      &.scroll-on-active {
        opacity: 1;
        transform: translateX(0px);
      }

      transition: 1s ease;
    }
  }

  & div.internal {
    margin-left: 20px;
    display: block;

    h1 {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }

  transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

  box-shadow: 0 10px var(--shadow-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px var(--shadow-color);
  }

  &:active {
    transform: translateY(5px);
    box-shadow: 0 5px var(--shadow-color);
  }

  &#parafield {
    --background-image: linear-gradient(to right, #f0ad48, #c3942e);
    --border-color: #ffbd5f;
    --shadow-color: rgb(205 125 0);
  }

  &#hypereclipse {
    --background-image: linear-gradient(to right, rgb(255, 100, 100), rgb(150, 125, 255), rgb(100, 150, 255));
    --border-color: #9881df;
    --shadow-color: #6a53af;
  }
}

@media (max-width: 1000px) {
  div.org-box {
    flex-direction: column;
    align-items: center;

    img {
      width: 40%;
    }

    gap: 10px;
  }
}
</style>