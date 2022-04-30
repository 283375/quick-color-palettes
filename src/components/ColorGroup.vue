<script setup>
import { computed } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'

const props = defineProps({
  colorName: {
    type: String,
    default: '',
  },
  colors: {
    type: Array,
    required: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
})

const renderedColors = computed(() =>
  props.colors
    .filter((e) => new TinyColor(e.color).isValid)
    .map((e) => {
      const instance = new TinyColor(e.color)
      let name = ''
      if (!props.horizontal) name += `${props.colorName} `
      return {
        name: (name += e.name),
        colorInstance: instance,
        textColor: instance.getLuminance() > 0.3 ? '#000' : '#fff',
        textSecondaryColor: instance.getLuminance() > 0.3 ? '#303133' : '#fff',
        textBackgroundCss: `
        linear-gradient(
          ${props.horizontal ? '0deg' : '90deg'},
          ${instance.clone().setAlpha(0).toRgbString()} 5%,
          ${instance.clone().setAlpha(0.5).toRgbString()} 10%,
          ${instance.toRgbString()})
      `,
      }
    })
)

const colorBarContainerStyle = computed(() => {
  const style = {
    width: '100%',
    height: props.horizontal ? '70px' : '100%',
    display: 'grid',
  }
  const gridRowCol = `repeat(${props.colors.length}, minmax(max-content, 1fr))`
  props.horizontal
    ? (style.gridTemplateColumns = gridRowCol)
    : (style.gridTemplateRows = gridRowCol)
  return style
})

const colorBarStyle = computed(() => {
  const style = {
    width: props.horizontal ? '100%' : '90%',
    hoverWidth: props.horizontal ? '100%' : '97.5%',
    height: props.horizontal ? '60px' : '100%',
    hoverHeight: props.horizontal ? '70px' : '100%',
    hoverBorderRadius: props.horizontal ? '0 0 10px 10px' : '0 10px 10px 0',
    position: 'relative',
    cursor: 'pointer',
    transition: 'border-radius 0.6s, width 0.5s, height 0.5s',
    transitionTimingFunction: 'cubic-bezier(0.1, 1.4, 0.7, 1.35)',
  }
  return style
})

const colorBarTextContainerStyle = computed(() => ({
  margin: props.horizontal ? '5px' : '10px 15px',
  hoverMargin: props.horizontal ? '15px 5px 5px 5px' : '10px 5px 10px 25px',
  display: 'flex',
  flexDirection: props.horizontal ? 'column' : 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'margin 0.4s cubic-bezier(0.1, 1.4, 0.7, 1.35)',
}))

const colorBarTextColorStyle = computed(() => ({
  paddingRight: props.horizontal ? '' : '10px',
  hoverPaddingRight: '0px',
  transition: 'padding 0.4s cubic-bezier(0, 1, 1, 1)',
}))
</script>

<template>
  <h3 v-if="horizontal" v-text="colorName" style="margin: 0.5em 0 0.2em 0"></h3>
  <div class="color-bar-container" :style="colorBarContainerStyle">
    <div
      v-for="color in renderedColors"
      :key="`${colorName}-${color.name}`"
      class="color-bar clipboard-enabled"
      :style="{
        backgroundColor: color.colorInstance.toHexString(),
        ...colorBarStyle,
      }"
      :data-clipboard-text="color.colorInstance.toHexString()"
    >
      <div class="color-bar-text-container" :style="colorBarTextContainerStyle">
        <span
          :style="{ fontSize: '1.2em', color: color.textColor }"
          v-text="color.name"
        >
        </span>
        <span
          class="color-bar-text-color"
          :style="{
            background: color.textBackgroundCss,
            color: color.textSecondaryColor,
            ...colorBarTextColorStyle
          }"
          v-text="color.colorInstance.toHexString()"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-bar:hover {
  width: v-bind('colorBarStyle.hoverWidth') !important;
  height: v-bind('colorBarStyle.hoverHeight') !important;
  border-radius: v-bind('colorBarStyle.hoverBorderRadius');
}

.color-bar:hover > .color-bar-text-container {
  margin: v-bind('colorBarTextContainerStyle.hoverMargin') !important;
}

.color-bar:hover:deep(.color-bar-text-color) {
  padding-right: v-bind('colorBarTextColorStyle.hoverPaddingRight');
}
</style>
