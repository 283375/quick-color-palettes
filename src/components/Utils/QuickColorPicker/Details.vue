<script setup>
import { computed } from 'vue'
import { NCard, NText, NButton } from 'naive-ui'
import { Copy24Regular } from '@vicons/fluent'
import { TinyColor } from '@ctrl/tinycolor'

const props = defineProps({
  colorInstance: {
    type: TinyColor,
    required: true,
  },
})

const currentColorValues = computed(() => ({
  RGB: props.colorInstance.toRgbString(),
  'RGB%': props.colorInstance.toPercentageRgbString(),
  HEX: props.colorInstance.toHexString(),
  HEX8: props.colorInstance.toHex8String(),
  HSV: props.colorInstance.toHsvString(),
  HSL: props.colorInstance.toHslString(),
}))

const currentColorDetails = computed(() => ({
  Brightness: props.colorInstance.getBrightness(),
  Luminance: props.colorInstance.getLuminance(),
  'Dark/Light': props.colorInstance.isDark() ? 'Dark' : 'Light',
  onBackground: props.colorInstance.onBackground(),
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
  <n-card>
    <template #header>Color Details</template>
    <div class="grid">
      <template v-for="(color, colorLabel) in currentColorValues">
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
        <div style="display: flex; align-items: center">
          <div
            v-if="detailsLabel === 'onBackground'"
            :style="{
              backgroundColor: new TinyColor(details),
              width: '25px',
              height: '25px',
              marginRight: '5px',
            }"
          ></div>
          <span v-text="details"></span>
        </div>
      </template>
    </div>
  </n-card>
</template>

<style scoped>
.grid {
  display: grid;
  grid: auto-flow / repeat(2, max-content);
  row-gap: 0.5em;
  column-gap: 0.75em;
  align-items: center;
}

.grid > *:nth-child(odd) {
  font-weight: bold;
  text-align: right;
}
</style>
