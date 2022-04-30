<script setup>
import { computed, reactive } from 'vue'
import {
  NCard,
  NSpace,
  NInputNumber,
  NInputGroup,
  NInputGroupLabel,
} from 'naive-ui'
import { TinyColor } from '@ctrl/tinycolor'

import ColorGroup from '@components/ColorGroup.vue'

const props = defineProps({
  colorInstance: {
    type: TinyColor,
    required: true,
  },
})

const models = reactive({
  analogous: {
    results: 6,
    slices: 30,
  },
  monochromatic: 6,
  polyad: 4,
})

const combinations = computed(() => ({
  Analogous: props.colorInstance.clone().analogous(
    // If user deleted the number, this value goes to 0 and hangs up the entire page,
    // so let's set a fallback value 1 here.
    models.analogous.results || 1,
    models.analogous.slices
  ),
  Monochromatic: props.colorInstance
    .clone()
    .monochromatic(models.monochromatic || 1),
  Polyad: props.colorInstance.clone().polyad(models.polyad || 1),
}))
</script>

<template>
  <n-card>
    <template #header>Color Combinations</template>
    <n-space wrap>
      <n-input-group>
        <n-input-group-label>Analogous</n-input-group-label>
        <n-input-number v-model:value="models.analogous.results" :min="1">
          <template #prefix>Results</template>
        </n-input-number>
        <n-input-number
          v-model:value="models.analogous.slices"
          :min="1"
          :step="5"
        >
          <template #prefix>Slices</template>
        </n-input-number>
      </n-input-group>
      <n-input-group>
        <n-input-group-label>Monochromatic</n-input-group-label>
        <n-input-number v-model:value="models.monochromatic" :min="1" />
      </n-input-group>
      <n-input-group>
        <n-input-group-label>Polyad</n-input-group-label>
        <n-input-number v-model:value="models.polyad" />
      </n-input-group>
    </n-space>

    <template v-for="(group, groupName) in combinations">
      <ColorGroup
        :colorName="groupName"
        :colors="group.map((e, i) => ({ name: i + 1, color: e.toRgbString() }))"
        :horizontal="group.length < 8"
        style="margin: 15px 0"
      />
    </template>
  </n-card>
</template>
