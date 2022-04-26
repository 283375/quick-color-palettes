<script setup>
import { computed, ref } from 'vue'
import { NColorPicker, NList, NListItem, NText, NButton } from 'naive-ui'
import { Copy24Regular } from '@vicons/fluent'
import { TinyColor } from '@ctrl/tinycolor'

const currentColor = ref('#00A2E8FF')
const currentColorInstance = computed(() => new TinyColor(currentColor.value))

const currentColorValues = computed(() => ({
  RGB: currentColorInstance.value.toRgbString(),
  HEX: currentColorInstance.value.toHexString(),
  HEX8: currentColorInstance.value.toHex8String(),
  HSV: currentColorInstance.value.toHsvString(),
  HSL: currentColorInstance.value.toHslString(),
}))

const handleSelect = (e) => {
  const selection = window.getSelection()
  selection.removeAllRanges()
  const range = document.createRange()
  range.selectNodeContents(e.target)
  selection.addRange(range)
}
</script>

<template>
  <div style="max-width: 500px">
    <NColorPicker v-model:value="currentColor" placement="right" />
    <NList label-placement="left" label-width="auto">
      <NListItem
        v-for="(color, colorLabel) in currentColorValues"
        :key="`qcp-${colorLabel}`"
        :label="colorLabel"
      >
        <template #prefix>
          {{ colorLabel }}
        </template>

        <NText @click="handleSelect">{{ color }}</NText>

        <template #suffix>
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
        </template>
      </NListItem>
    </NList>
  </div>
</template>
