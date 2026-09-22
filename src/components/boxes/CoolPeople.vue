<script setup lang="ts">
const openLink = (url: string) => {
  window.open(url)
}
</script>

<template>
  <div class="cool-people-box scroll-on">
    <h1>Cool people</h1>
    <p style="text-align: center; font-size: 1.5rem; font-weight: bold;">
      These people might seem like random names on a website, but they mean a lot to me.<br/>
      They have supported me, encouraged me, and helped me keep going when I've felt like giving up.<br/>
      Through coding, projects, conversations, and countless little moments, they've shared their knowledge, experiences, and time with me.<br/>
      They've helped me learn, grow, and become the person I am today.<br/><br/>

      I'm incredibly grateful for every one of them. They have each left their own mark on my life,<br/>
      and I genuinely wouldn't be where I am today without them.
    </p>

    <div class="people-links">
      <div class="people" id="people-tech" @click="openLink('https://technologicalbyte.com/')">
        <img src="/assets/people/tech.jpg" alt="TechnologicalByte" />
        <h2>TechnologicalByte</h2>
      </div>

      <div class="people" id="people-batista" @click="openLink('https://batista.parafieldstudios.com/')">
        <img src="/assets/people/batista.jpg" alt="BatistaCakewalk" />
        <h2>Batista</h2>
      </div>

      <div class="people" id="people-st6" @click="openLink('https://technologicalshadows-home.carrd.co/')">
        <img src="/assets/people/st6.png" alt="EclipseTech" />
        <h2>EclipseTech4820</h2>
      </div>

      <div class="people" id="people-malachi196" @click="openLink('https://github.com/malachi196')">
        <img src="/assets/people/malachi196.png" alt="malachi196" />
        <h2>malachi196</h2>
      </div>

      <div class="people" id="people-mushy" @click="openLink('https://discordapp.com/users/1016878311005225032')">
        <img src="/assets/people/mushy.png" alt="Mushy" />
        <h2>Mushy</h2>
      </div>

      <div class="people" id="people-notdef" @click="openLink('https://discordapp.com/users/1278494594560032849')">
        <img src="/assets/people/notdef.png" alt="notdefyingphysics" />
        <h2>notdefyingphysics</h2>
      </div>

      <div class="people" id="people-dontluck2" @click="openLink('https://www.youtube.com/@DontLuck2Music')">
        <img src="/assets/people/dontluck2.jpg" alt="Dontluck2" />
        <h2>DontLuck2</h2>
      </div>

      <div class="people" id="people-nikk" @click="openLink('https://github.com/nikorsd')">
        <img src="/assets/people/nikk.png" alt="Nikk" />
        <h2>Nikk</h2>
      </div>
    </div>
  </div>
</template>
