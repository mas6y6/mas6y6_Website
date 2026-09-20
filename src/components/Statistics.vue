<template>
  <div class="stats-box scroll-on">
    <h1>Statistics</h1>
    <h2>GitHub</h2>
    <div class="stats github-stats">
      <embed class="scroll-on" src="https://github-stats-extended.vercel.app/api?username=mas6y6&title_color=9b59ff&text_color=e0dbe0&icon_color=5500ff&bg_color=100017&hide_border=true"></embed>
      <embed class="scroll-on" src="https://streak-stats.demolab.com?user=mas6y6&ring=9b59ff&fire=5500ff&currStreakNum=e0dbe0&sideNums=e0dbe0&currStreakLabel=e0dbe0&sideLabels=b0aac0&dates=b0aac0&background=100017&hide_border=true"></embed>
    </div>
    <h2>Activity</h2>
    <div class="stats">
      <embed class="scroll-on" src="https://wakatime.com/share/@mas6y6/1c09cc1a-7ead-428c-9430-4df6996ecb9a.svg"></embed>
      <embed class="scroll-on" src="https://wakatime.com/share/@mas6y6/fa6bb6d1-1739-4ed6-be35-780ce43731f1.svg"></embed>
      <embed class="scroll-on" src="https://wakatime.com/share/@mas6y6/d015a946-52b3-4f17-86c8-dc0b16fc3b21.svg"></embed>
    </div>
    <p style="font-size: small; text-align: center">Embedded stats not loading? See the full profile at <a href="https://wakatime.com/@mas6y6">wakatime.com/@mas6y6</a></p>
    <p style="font-size: small">Powered by <a href="https://wakatime.com">Wakatime</a> and <a href="https://github.com/stats-organization/github-stats-extended">GitHub Stats Extended</a></p>
  </div>
</template>

<style scoped>
h2 {
  margin: 30px 0 0;
  text-align: center;
}

div.github-stats {
  margin-top: 1.5%;
}

div.stats embed {
  border-radius: 8px;
}
</style>
