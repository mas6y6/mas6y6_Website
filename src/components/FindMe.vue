<script setup>
const openLink = (url) => {
  window.open(url)
}
</script>

<template>
  <div class="find-me-box scroll-on">
    <h1>Where you can find me</h1>
    <p>I don't have many social platforms, but my main platforms are listed below.</p>

    <div class="social-links">
      <div class="social-box github" id="social-github" @click="openLink('https://github.com/mas6y6')">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="Github" />
        <h2>Github</h2>
      </div>

      <div class="social-box youtube" id="social-youtube" @click="openLink('https://www.youtube.com/@mas6y6')">
        <img src="/assets/socials/youtube.webp" alt="Youtube" />
        <h2>Youtube</h2>
      </div>

      <div class="social-box discord" id="social-discord" @click="openLink('https://discordapp.com/users/1165046623299174531')">
        <img src="/assets/socials/discord.png" alt="Discord" />
        <h2>Discord</h2>
      </div>
    </div>
  </div>
</template>
