<script setup>
import { computed, ref, reactive, watch } from 'vue'
import {
  NCard,
  NColorPicker,
  NSpace,
  NText,
  NButton,
  NGrid,
  NGridItem,
  NInputNumber,
  NInputGroup,
  NTooltip,
} from 'naive-ui'
import { Copy24Regular } from '@vicons/fluent'
import { TinyColor, random as randomTinyColor } from '@ctrl/tinycolor'

const currentColorInstance = ref(new TinyColor('#00A2E8FF'))
const currentColor = computed({
  get: () =>
    currentColorInstance.value.toString(currentColorInstance.value.format),
  set: (c) => {
    currentColorInstance.value = new TinyColor(c)
  },
})
const colorHistory = ref([])

const randomColor = () => (currentColorInstance.value = randomTinyColor())

watch(currentColorInstance, (newIns, oldIns) => {
  if (newIns.equals(oldIns)) return
  colorHistory.value.push(newIns)
  if (colorHistory.value.length === 10) colorHistory.value.shift()
})

const currentColorValues = computed(() => ({
  RGB: currentColorInstance.value.toRgbString(),
  'RGB%': currentColorInstance.value.toPercentageRgbString(),
  HEX: currentColorInstance.value.toHexString(),
  HEX8: currentColorInstance.value.toHex8String(),
  HSV: currentColorInstance.value.toHsvString(),
  HSL: currentColorInstance.value.toHslString(),
}))

const currentColorDetails = computed(() => ({
  Brightness: currentColorInstance.value.getBrightness(),
  Luminance: currentColorInstance.value.getLuminance(),
  'Dark/Light': currentColorInstance.value.isDark() ? 'Dark' : 'Light',
  onBackground: currentColorInstance.value.onBackground(),
}))

const quickActionsModels = reactive({
  lighten: 10,
  darken: 10,
  brighten: 10,
  tint: 10,
  shade: 10,
  saturate: 10,
  desaturate: 10,
  spin: 0,
  mix: '#00A2E8FF',
  mixColorInstance: computed(() => new TinyColor(quickActionsModels.mix)),
})

const replaceColorInstance = (newInstance) => {
  currentColorInstance.value = newInstance
}

const quickActions = {
  lighten: () =>
    replaceColorInstance(
      currentColorInstance.value.lighten(quickActionsModels.lighten)
    ),
  darken: () =>
    replaceColorInstance(
      currentColorInstance.value.darken(quickActionsModels.darken)
    ),
  brighten: () =>
    replaceColorInstance(
      currentColorInstance.value.brighten(quickActionsModels.brighten)
    ),
  tint: () =>
    replaceColorInstance(
      currentColorInstance.value.tint(quickActionsModels.tint)
    ),
  shade: () =>
    replaceColorInstance(
      currentColorInstance.value.shade(quickActionsModels.shade)
    ),
  saturate: () =>
    replaceColorInstance(
      currentColorInstance.value.saturate(quickActionsModels.saturate)
    ),
  desaturate: () =>
    replaceColorInstance(
      currentColorInstance.value.desaturate(quickActionsModels.desaturate)
    ),
  spin: () =>
    replaceColorInstance(
      currentColorInstance.value.spin(quickActionsModels.spin)
    ),
  mix: () =>
    replaceColorInstance(
      currentColorInstance.value.mix(quickActionsModels.mixColorInstance)
    ),
  greyscale: () => replaceColorInstance(currentColorInstance.value.greyscale()),
}

const handleSelect = (e) => {
  const selection = window.getSelection()
  selection.removeAllRanges()
  const range = document.createRange()
  range.selectNodeContents(e.target)
  selection.addRange(range)
}
</script>

<template>
  <div>
    <n-grid cols="1 m:2" responsive="screen" :x-gap="12" :y-gap="12">
      <n-grid-item>
        <n-card>
          <template #header>
            <span>Quick Actions</span>
            <span style="font-size: 0.6em; margin-left: 1em">
              Powered by <n-text code>@ctrl/tinycolor</n-text> ❤
            </span>
          </template>
          <n-grid cols="1 200:2" :x-gap="5" :y-gap="10">
            <n-grid-item
              v-for="action in [
                'lighten',
                'darken',
                'brighten',
                'tint',
                'shade',
                'saturate',
                'desaturate',
              ]"
            >
              <n-input-group>
                <n-input-number
                  v-model:value="quickActionsModels[action]"
                  :min="0"
                  :max="100"
                />
                <n-button @click="quickActions[action]()">
                  {{ action.replace(action[0], action[0].toUpperCase()) }}
                </n-button>
              </n-input-group>
            </n-grid-item>
            <n-grid-item>
              <n-input-group>
                <n-input-number
                  v-model:value="quickActionsModels.spin"
                  :min="-360"
                  :max="360"
                />
                <n-button @click="quickActions.spin()">Spin</n-button>
              </n-input-group>
            </n-grid-item>
            <n-grid-item>
              <n-input-group>
                <n-color-picker v-model:value="quickActionsModels.mix" />
                <n-button @click="quickActions.mix()">Mix</n-button>
              </n-input-group>
            </n-grid-item>
            <n-grid-item>
              <n-space justify="space-between">
                <n-button @click="quickActions.greyscale()">Greyscale</n-button>
                <n-button type="warning" @click="randomColor()">
                  Feeling Lucky!
                </n-button>
              </n-space>
            </n-grid-item>
            <n-grid-item span="2">
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
              </n-space>
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card>
          <template #header>Color</template>
          <n-color-picker v-model:value="currentColor" placement="top-end" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card>
          <template #header>Color Details</template>
          <div class="grid">
            <template
              v-for="(color, colorLabel) in currentColorValues"
              :key="`qcp-${colorLabel}`"
            >
              <n-button
                secondary
                type="info"
                size="small"
                class="clipboard-enabled"
                :data-clipboard-text="color"
              >
                <template #icon>
                  <copy24-regular />
                </template>
                Copy {{ colorLabel }}
              </n-button>
              <n-text @click="handleSelect">{{ color }}</n-text>
            </template>

            <template v-for="(details, detailsLabel) in currentColorDetails">
              <span v-text="`${detailsLabel}`"></span>
              <span v-text="details"></span>
            </template>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
.color-history-block {
  width: 25px;
  height: 25px;
}

.grid {
  display: grid;
  grid: auto-flow / max-content auto;
  row-gap: 0.5em;
  column-gap: 0.75em;
  align-items: center;
}

.grid > *:nth-child(odd) {
  font-weight: bold;
  text-align: right;
}
</style>
