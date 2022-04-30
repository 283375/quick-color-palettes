<script setup>
import { computed, ref, watch } from 'vue'
import {
  NCard,
  NColorPicker,
  NSpace,
  NText,
  NButton,
  NGrid,
  NGridItem,
  NTooltip,
} from 'naive-ui'
import { Dismiss24Regular } from '@vicons/fluent'
import { TinyColor, random as randomTinyColor } from '@ctrl/tinycolor'

import QuickActions from './QuickActions.vue'
import ColorDetails from './Details.vue'
import ColorReadability from './Readability.vue'
import ColorCombinations from './Combinations.vue'

const currentColorInstance = ref(new TinyColor('#00A2E8FF'))
const currentColor = computed({
  get: () =>
    currentColorInstance.value.toString(currentColorInstance.value.format),
  set: (c) => {
    currentColorInstance.value = new TinyColor(c)
  },
})
const randomColor = () => (currentColorInstance.value = randomTinyColor())
const colorHistory = ref([])

watch(currentColorInstance, (newIns, oldIns) => {
  if (newIns.equals(oldIns)) return
  colorHistory.value.push(newIns)
  if (colorHistory.value.length === 10) colorHistory.value.shift()
})
const clearHistory = () => {
  colorHistory.value = []
}
</script>

<template>
  <div>
    <n-grid cols="1 m:2" responsive="screen" :x-gap="12" :y-gap="12">
      <n-grid-item>
        <n-card>
          <template #header>Color</template>

          <QuickActions v-model:colorInstance="currentColorInstance" />
          <n-color-picker v-model:value="currentColor" placement="top-end" />

          <n-space align="center" justify="space-between">
            <!-- History start -->
            <n-space align="center">
              <span>History</span>
              <n-text depth="3" v-if="colorHistory.length === 0">
                <i>Nothing here...</i>
              </n-text>
              <template v-for="colorInstance in colorHistory">
                <n-tooltip>
                  <template #trigger>
                    <div
                      class="color-history-block"
                      :style="{
                        backgroundColor: colorInstance.toRgbString(),
                      }"
                    ></div>
                  </template>
                  {{ colorInstance.toString(colorInstance.format) }}
                  <n-button
                    size="small"
                    type="warning"
                    @click="currentColorInstance = colorInstance"
                  >
                    Restore
                  </n-button>
                </n-tooltip>
              </template>
              <n-button
                secondary
                type="warning"
                size="small"
                v-show="colorHistory.length > 0"
                @click="clearHistory()"
              >
                <template #icon><Dismiss24Regular /></template>
                Clear
              </n-button>
            </n-space>
            <!-- History end -->

            <n-button
              secondary
              size="small"
              type="warning"
              @click="randomColor()"
            >
              Random
            </n-button>
          </n-space>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <ColorDetails :color-instance="currentColorInstance" />
      </n-grid-item>

      <n-grid-item>
        <ColorReadability :color-instance="currentColorInstance" />
      </n-grid-item>

      <n-grid-item>
        <ColorCombinations :color-instance="currentColorInstance" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
.color-history-block {
  width: 25px;
  height: 25px;
}
</style>
