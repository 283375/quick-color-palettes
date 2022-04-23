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
})

const renderedColors = computed(() =>
  props.colors
    .filter((e) => new TinyColor(e.color).isValid)
    .map((e) => ({
      name: `${props.colorName} ${e.name}`,
      colorInstance: new TinyColor(e.color),
    }))
)
</script>

<template>
  <div v-for="color in renderedColors" :key="color.name">
    <div
      class="color-bar clipboard-enabled"
      :style="{
        backgroundColor: color.colorInstance.toHexString(),
      }"
      :data-clipboard-text="color.colorInstance.toHexString()"
    >
      <div
        class="color-bar-text"
        :style="{
          color: color.colorInstance.getLuminance() > 0.3 ? '#000' : '#fff',
        }"
      >
        <span style="font-size: 1.2em">{{ color.name }}</span>
        <span>{{ color.colorInstance.toHexString() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-bar {
  width: 90%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition-timing-function: cubic-bezier(0.1, 1.4, 0.7, 1.35);
  transition: border-radius 0.6s, width 0.4s, background 0.3s ease;
}

.color-bar:hover {
  width: 97.5%;
  border-radius: 0 10px 10px 0;
}

.color-bar-text {
  margin: 8px 20px 8px 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: margin 0.6s;
  transition-timing-function: cubic-bezier(0.1, 1.4, 0.7, 1.35);
}

.color-bar:hover > .color-bar-text {
  margin: 8px 15px 8px 30px;
}
</style>
