<script setup>
import { computed, ref, reactive } from 'vue'
import {
  NCard,
  NCode,
  NColorPicker,
  NSpace,
  NText,
  NButton,
  NGrid,
  NGridItem,
  NInputNumber,
  NInputGroup,
} from 'naive-ui'
import { Copy24Regular } from '@vicons/fluent'
import { TinyColor } from '@ctrl/tinycolor'

const currentColorInstance = ref(new TinyColor('#00A2E8FF'))
const currentColorFormat = ref('hex8')
const currentColor = computed({
  get: () => currentColorInstance.value.toString(currentColorFormat.value),
  set: (c) => {
    currentColorInstance.value = new TinyColor(c)
    currentColorFormat.value = currentColorInstance.value.format
  },
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
  is: currentColorInstance.value.isDark() ? 'Dark' : 'Light',
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
    <NGrid cols="1 m:2" responsive="screen" :x-gap="12" :y-gap="12">
      <NGridItem>
        <NCard>
          <template #header>
            <span>Quick Actions</span>
            <span style="font-size: 0.6em; margin-left: 1em">
              Powered by <NCode>@ctrl/tinycolor</NCode> ❤
            </span>
          </template>
          <NGrid cols="1 200:2" :x-gap="5" :y-gap="10">
            <NGridItem
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
              <NInputGroup>
                <NInputNumber
                  v-model:value="quickActionsModels[action]"
                  :min="0"
                  :max="100"
                />
                <NButton @click="quickActions[action]()">
                  {{ action.replace(action[0], action[0].toUpperCase()) }}
                </NButton>
              </NInputGroup>
            </NGridItem>
            <NGridItem>
              <NInputGroup>
                <NInputNumber
                  v-model:value="quickActionsModels.spin"
                  :min="-360"
                  :max="360"
                />
                <NButton @click="quickActions.spin()">Spin</NButton>
              </NInputGroup>
            </NGridItem>
            <NGridItem>
              <NInputGroup>
                <NColorPicker v-model:value="quickActionsModels.mix" />
                <NButton @click="quickActions.mix()">Mix</NButton>
              </NInputGroup>
            </NGridItem>
            <NGridItem>
              <NButton @click="quickActions.greyscale()">Greyscale</NButton>
            </NGridItem>
          </NGrid>
        </NCard>
        <NColorPicker v-model:value="currentColor" placement="top-end" />
      </NGridItem>
      <NGridItem>
        <NSpace vertical>
          <NSpace
            v-for="(color, colorLabel) in currentColorValues"
            :key="`qcp-${colorLabel}`"
            justify="space-between"
            style="width: 100%"
          >
            <div>
              {{ colorLabel }}
            </div>
            <NText @click="handleSelect">{{ color }}</NText>
            <NButton
              secondary
              type="info"
              class="clipboard-enabled"
              :data-clipboard-text="color"
            >
              <template #icon>
                <Copy24Regular />
              </template>
              Copy
            </NButton>
          </NSpace>

          <div v-for="(details, detailsLabel) in currentColorDetails">
            <span v-text="detailsLabel"></span>
            <span v-text="': '"></span>
            <span v-text="details"></span>
          </div>
        </NSpace>
      </NGridItem>
    </NGrid>
  </div>
</template>
