<script setup>
import { computed, reactive } from 'vue'
import {
  NCard,
  NColorPicker,
  NButton,
  NGrid,
  NGridItem,
  NInputNumber,
  NInputGroup,
} from 'naive-ui'
import { TinyColor } from '@ctrl/tinycolor'

const props = defineProps({
  colorInstance: {
    type: TinyColor,
    required: true,
  },
})
const $emit = defineEmits(['update:colorInstance'])

const replaceColorInstance = (newInstance) => {
  $emit('update:colorInstance', newInstance)
}

const models = reactive({
  lighten: 10,
  darken: 10,
  brighten: 10,
  tint: 10,
  shade: 10,
  saturate: 10,
  desaturate: 10,
  spin: 0,
  mix: '#00A2E8FF',
  mixColorInstance: computed(() => new TinyColor(models.mix)),
})

const quickActions = (method) => {
  if (method === 'mix') {
    replaceColorInstance(props.colorInstance.mix(models.mixColorInstance))
  } else {
    replaceColorInstance(props.colorInstance[method](models[method]))
  }
}
</script>

<template>
  <n-card>
    <template #header>Quick Actions</template>
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
          <n-input-number v-model:value="models[action]" :min="0" :max="100" />
          <n-button @click="quickActions(action)">
            {{ action.replace(action[0], action[0].toUpperCase()) }}
          </n-button>
        </n-input-group>
      </n-grid-item>
      <n-grid-item>
        <n-input-group>
          <n-input-number v-model:value="models.spin" :min="-360" :max="360" />
          <n-button @click="quickActions('spin')">Spin</n-button>
        </n-input-group>
      </n-grid-item>
      <n-grid-item>
        <n-input-group>
          <n-color-picker v-model:value="models.mix" />
          <n-button @click="quickActions('mix')">Mix</n-button>
        </n-input-group>
      </n-grid-item>
      <n-grid-item>
        <n-button @click="quickActions('greyscale')">Greyscale</n-button>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>
