<script setup lang="ts">

import SoftwareIcon from "./SoftwareIcon.vue";
import affinity from "/public/software/affinity.jpg";
</script>

<template>
  <div class="programs_box scroll-on">
    <h1>Software</h1>

    <p>This is a collection of the software I use to create, develop, and build literally just about everything.</p>

    <div style="flex-wrap: wrap; display: flex; align-items: center; justify-content: center;">
      <SoftwareIcon
          name="WebStorm"
          icon="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.svg"
          link="https://www.jetbrains.com/webstorm/"
          cssclass="webstorm"
          :black-text=false
      />
      <SoftwareIcon
          name="IntelliJ IDEA"
          icon="https://resources.jetbrains.com/storage/products/company/brand/logos/IntelliJ_IDEA_icon.svg"
          link="https://www.jetbrains.com/idea/"
          cssclass="intellij"
          :black-text=false
      />
      <SoftwareIcon
          name="PyCharm"
          icon="https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg"
          link="https://www.jetbrains.com/pycharm/"
          cssclass="pycharm"
          :black-text=false
      />

      <SoftwareIcon
          name="CLion"
          icon="https://resources.jetbrains.com/storage/products/company/brand/logos/CLion_icon.svg"
          link="https://www.jetbrains.com/clion/"
          cssclass="clion"
          :black-text=false
      />

      <SoftwareIcon
          name="RustRover"
          icon="https://resources.jetbrains.com/storage/products/company/brand/logos/RustRover_icon.svg"
          link="https://www.jetbrains.com/rust/"
          cssclass="rustrover"
          :black-text=false
      />

      <SoftwareIcon
          name="Affinity"
          :icon="affinity"
          link="https://www.affinity.studio/"
          cssclass="affinity"
          :black-text=true
      />

      <SoftwareIcon
          name="Visual Studio Code"
          icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
          link="https://code.visualstudio.com/"
          cssclass="vscode"
          :black-text=false
      />
    </div>
  </div>
</template>

<style scoped>

</style>