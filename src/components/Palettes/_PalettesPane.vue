<script setup>
import { NTabs, NTabPane, NGrid, NGridItem } from 'naive-ui'

import ColorGroup from '@components/ColorGroup.vue'
import palettes from '@assets/palettes.json'
</script>

<template>
  <NTabs v-for="(palette, paletteName) in palettes" :key="palette" animated>
    <NTabPane :name="paletteName" :key="`palette-${paletteName}`">
      <NGrid :x-gap="2" :y-gap="10" cols="1 500:2 750:3 1000:4">
        <NGridItem
          v-for="(colorGroup, colorGroupName) in palettes[paletteName]"
          :key="`${paletteName}-${colorGroupName}`"
        >
          <ColorGroup :colors="colorGroup" :color-name="colorGroupName" />
        </NGridItem>
      </NGrid>
    </NTabPane>
  </NTabs>
</template>
