<script setup>
import { NTabs, NTabPane, NGrid, NGridItem, NA, NIcon } from 'naive-ui'
import { Open24Regular } from '@vicons/fluent'

import ColorGroup from '@components/ColorGroup.vue'
import palettes from '@assets/palettes.json'
</script>

<template>
  <n-tabs animated>
    <n-tab-pane
      v-for="(palette, paletteName) in palettes"
      :name="paletteName"
      :key="`palette-${paletteName}`"
    >
      <template #tab>
        <span v-text="paletteName"></span>
        <n-a
          v-if="palette.link"
          :href="palette.link"
          target="_blank"
          style="margin-left: 0.5em"
        >
          <n-icon><Open24Regular /></n-icon>
        </n-a>
      </template>
      <n-grid :x-gap="2" :y-gap="10" cols="1 500:2 750:3 1000:4">
        <n-grid-item
          v-for="(colorGroup, colorGroupName) in palettes[paletteName].colors"
          :key="`${paletteName}-${colorGroupName}`"
        >
          <color-group :colors="colorGroup" :color-name="colorGroupName" />
        </n-grid-item>
      </n-grid>
    </n-tab-pane>
  </n-tabs>
</template>
