<script setup>
import { ref, computed } from 'vue'
import { NColorPicker, NGrid, NGridItem, NCard, NA } from 'naive-ui'
import { TinyColor } from '@ctrl/tinycolor'

import LogoSvg from '@assets/logo.svg?component'

const logoColor = ref('#00A2E8FF')
const logoColorInstance = computed(() => new TinyColor(logoColor.value))

const versions = computed(() => ({
  __PACKAGE_JSON_VER__: __PACKAGE_JSON_VER__,
  __GIT_VERSION__: __GIT_VERSION__,
}))

const thanks = [
  { name: 'naive-ui', link: 'https://www.naiveui.com/' },
  { name: '@ctrl/tinycolor', link: 'https://github.com/scttcper/tinycolor' },
  { name: 'vite-aliases', link: 'https://github.com/subwaytime/vite-aliases' },
  {
    name: 'vite-svg-loader',
    link: 'https://github.com/jpkleemans/vite-svg-loader',
  },
  {
    name: 'vite-plugin-git-revision',
    link: 'https://github.com/qduld/vite-plugin-git-revision',
  },
]
</script>

<template>
  <n-grid cols="1 m:2" responsive="screen">
    <n-grid-item>
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: logoColorInstance.toRgbString(),
          fill: logoColorInstance.toRgbString(),
        }"
      >
        <n-color-picker
          v-model:value="logoColor"
          placement="right"
          style="max-width: 250px"
        />
        <LogoSvg
          :style="{
            display: 'block',
            width: '250px',
            height: '250px',
          }"
        />
        <div style="font-size: 2em">Quick Color Palettes</div>
        <div style="font-size: 1.5em">283375</div>
        <div style="font-size: 1em">
          Version {{ versions.__PACKAGE_JSON_VER__ }}
        </div>
        <div>(git describe: {{ versions.__GIT_VERSION__ }})</div>
      </div>
    </n-grid-item>

    <n-grid-item>
      <n-card>
        <template #header>Special Thanks</template>

        <n-a
          v-for="project in thanks"
          :key="project.name"
          target="_blank"
          :href="project.link"
          style="display: inline-block; padding: 5px 7px"
        >
          {{ project.name }}
        </n-a>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
