<script setup>
import { ref, reactive, computed, watch, h } from 'vue'
import {
  NGrid,
  NGridItem,
  NForm,
  NFormItem,
  NSwitch,
  NColorPicker,
  NCollapseTransition,
  NAlert,
  NA,
  NSpace,
} from 'naive-ui'
import { TinyColor } from '@ctrl/tinycolor'
import { debounce } from 'lodash'

import ColorGroup from '@components/ColorGroup.vue'
import generate from './AntdAlgorithm'

const primaryMinSaturation = 70 // 主色推荐最小饱和度
const primaryMinBrightness = 70 // 主色推荐最小亮度

const computedColors = ref([])
const options = reactive({
  primaryColor: '#00a2e8',
  darkTheme: false,
  backgroundColor: '#000000',
})

const computeColors = debounce(
  () => {
    computedColors.value = generate(options).map((e, i) => ({
      name: `color-${i}`,
      color: e,
    }))
  },
  250,
  { maxWait: 500 }
)
computeColors()

watch(options, () => computeColors())

const currentColorInstance = computed(() =>
  options.primaryColor ? new TinyColor(options.primaryColor) : null
)

const colorSuggestions = computed(() => {
  if (currentColorInstance.value) {
    const colorInstanceHsv = currentColorInstance.value.toHsv()
    let suggestion = []
    if (colorInstanceHsv.s * 100 < primaryMinSaturation) {
      suggestion.push(
        `Suggested saturation is above ${primaryMinSaturation}, now ${(
          colorInstanceHsv.s * 100
        ).toFixed(2)}`
      )
    }
    if (colorInstanceHsv.v * 100 < primaryMinBrightness) {
      suggestion.push(
        `Suggested brightness is above ${primaryMinBrightness}, now ${(
          colorInstanceHsv.v * 100
        ).toFixed(2)}`
      )
    }
    return suggestion.join('\n')
  }
  return null
})
</script>

<template>
  <n-grid cols="1 m:2" responsive="screen" :x-gap="10" :y-gap="10">
    <n-grid-item>
      <n-form>
        <n-alert type="info" style="margin-bottom: 1em">
          <n-a
            href="https://ant.design/docs/spec/colors#Palette-Generation-Tool"
            target="_blank"
          >
            Ant Design - Palette generation tool
          </n-a>
        </n-alert>

        <n-form-item label="Primary color">
          <n-color-picker
            v-model:value="options.primaryColor"
            style="width: 350px"
          />
        </n-form-item>
        <n-form-item label="Enable dark theme">
          <n-switch v-model:value="options.darkTheme" />
        </n-form-item>
        <n-collapse-transition v-show="options.darkTheme">
          <n-form-item label="Dark theme background color">
            <n-color-picker
              v-model:value="options.backgroundColor"
              style="width: 350px"
            />
          </n-form-item>
        </n-collapse-transition>
      </n-form>
    </n-grid-item>
    <n-grid-item>
      <n-space vertical>
        <n-collapse-transition v-show="colorSuggestions">
          <n-alert type="warning" title="Primary color suggestions">
            <div style="white-space: pre-wrap" v-text="colorSuggestions"></div>
          </n-alert>
        </n-collapse-transition>
        <ColorGroup :colors="computedColors" />
      </n-space>
    </n-grid-item>
  </n-grid>
</template>
