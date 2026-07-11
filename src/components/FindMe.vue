<script setup>
const openLink = (url) => {
  window.open(url)
}
</script>

<template>
  <div class="find-me-box scroll-on">
    <h1>Where you can find me</h1>

    <p>
      These are my social platforms that I use to connect with others.
    </p>

    <p class="warning">
      As of 7/9/26 my bluesky account has been terminated. As of result of the stupid age verification policy. <br/>
      I am currently looking for a new platform to use. So for now, I'll have to be using twitter.

      <br/><br/>And no I am not calling it "X"
    </p>

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

      <div class="social-box twitter" id="social-twitter" @click="openLink('https://x.com/mas6y6')">
        <img src="/assets/socials/twitter.svg" alt="Twitter" />
        <h2>Twitter</h2>
      </div>

      <div class="social-box threads" id="social-threads" @click="openLink('https://www.threads.com/@mas6y6')">
        <img src="/assets/socials/threads.svg" alt="Threads" />
        <h2>Threads</h2>
      </div>

      <div class="social-box tumblr" id="social-tumblr" @click="openLink('https://www.tumblr.com/mas6y6')">
        <img src="/assets/socials/tumblr.svg" alt="tumblr" />
        <h2>Tumblr</h2>
      </div>

      <div class="social-box twitch" id="social-twitch" @click="openLink('https://www.twitch.tv/mas6y6')">
        <img src="/assets/socials/twitch.svg" alt="twitch" />
        <h2>Twitch</h2>
      </div>
    </div>
  </div>
</template>
