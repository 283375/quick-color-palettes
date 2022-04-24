<script setup>
import { NTabs, NTabPane, NGrid, NGridItem, NA, NIcon } from 'naive-ui'
import { Open24Regular } from '@vicons/fluent'

import ColorGroup from '@components/ColorGroup.vue'
import palettes from '@assets/palettes.json'
</script>

<template>
  <NTabs v-for="(palette, paletteName) in palettes" :key="palette" animated>
    <NTabPane :name="paletteName" :key="`palette-${paletteName}`">
      <template #tab>
        <span v-text="paletteName"></span>
        <NA
          v-if="palette.link"
          :href="palette.link"
          target="_blank"
          style="margin-left: 0.5em"
        >
          <NIcon><Open24Regular /></NIcon>
        </NA>
      </template>
      <NGrid :x-gap="2" :y-gap="10" cols="1 500:2 750:3 1000:4">
        <NGridItem
          v-for="(colorGroup, colorGroupName) in palettes[paletteName].colors"
          :key="`${paletteName}-${colorGroupName}`"
        >
          <ColorGroup :colors="colorGroup" :color-name="colorGroupName" />
        </NGridItem>
      </NGrid>
    </NTabPane>
  </NTabs>
</template>
