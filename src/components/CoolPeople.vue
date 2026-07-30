<script setup>
const openLink = (url) => {
  window.open(url)
}
</script>

<template>
  <div class="cool-people-box scroll-on">
    <h1>Cool people</h1>
    <p>These people have pushed me so far to reach this point. I appreciate them and wouldn't be here without them.</p>
    <div class="people-links">
      <div class="people" id="people-tech" @click="openLink('https://technologicalbyte.com/')">
        <img src="/assets/people/tech.jpg" alt="TechnologicalByte" />
        <h2>TechnologicalByte</h2>
      </div>

      <div class="people" id="people-batista" @click="openLink('https://batista.parafieldstudios.com/')">
        <img src="/assets/people/batista.jpg" alt="Batista" />
        <h2>Batista</h2>
      </div>

      <div class="people" id="people-st6" @click="openLink('https://technologicalshadows-home.carrd.co/')">
        <img src="/assets/people/st6.png" alt="EclipseTech" />
        <h2>EclipseTech4820</h2>
      </div>

      <div class="people" id="people-malachi196" @click="openLink('https://discordapp.com/users/1166148454603571280')">
        <img src="/assets/people/malachi196.png" alt="Malach" />
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

      <div class="people" id="people-kebin" @click="openLink('https://github.com/shadowmewtwogx2020')">
        <img src="/assets/people/kebin.png" alt="WavierGolem5727" />
        <h2>WavierGolem5727</h2>
      </div>
    </div>
  </div>
</template>
