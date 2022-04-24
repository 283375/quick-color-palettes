<script setup>
import { computed, ref } from 'vue'
import { NColorPicker, NForm, NFormItem } from 'naive-ui'
import { TinyColor } from '@ctrl/tinycolor'

import QuickColorPickerInputGroup from './QuickColorPickerInputGroup.vue'

const currentColor = ref('#00A2E8FF')
const currentColorInstance = computed(() => new TinyColor(currentColor.value))

const currentColorValues = computed(() => ({
  rgb: currentColorInstance.value.toRgbString(),
  hex: currentColorInstance.value.toHexString(),
  hex8: currentColorInstance.value.toHex8String(),
  hsv: currentColorInstance.value.toHsvString(),
  hsl: currentColorInstance.value.toHslString(),
}))
</script>

<template>
  <div style="max-width: 500px">
    <NColorPicker v-model:value="currentColor" placement="right" />
    <NForm label-placement="left" label-width="auto">
      <NFormItem label="RGB">
        <QuickColorPickerInputGroup :value="currentColorValues.rgb" />
      </NFormItem>
      <NFormItem label="HEX">
        <QuickColorPickerInputGroup :value="currentColorValues.hex" />
      </NFormItem>
      <NFormItem label="HEX8">
        <QuickColorPickerInputGroup :value="currentColorValues.hex8" />
      </NFormItem>
      <NFormItem label="HSV">
        <QuickColorPickerInputGroup :value="currentColorValues.hsv" />
      </NFormItem>
      <NFormItem label="HSL">
        <QuickColorPickerInputGroup :value="currentColorValues.hsl" />
      </NFormItem>
    </NForm>
  </div>
</template>
