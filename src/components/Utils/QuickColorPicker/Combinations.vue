<script setup>
import { computed, reactive } from 'vue'
import {
  NCard,
  NSpace,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
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
  analogous: props.colorInstance.clone().analogous(
    // If user deleted the number, this value goes to 0 and hangs up the entire page,
    // so let's set a fallback value 1 here.
    models.analogous.results || 1,
    models.analogous.slices
  ),
  monochromatic: props.colorInstance
    .clone()
    .monochromatic(models.monochromatic || 1),
  polyad: props.colorInstance.clone().polyad(models.polyad || 1),
}))

const combinationsMapped = computed(() => {
  let ret = []
  const keys = Object.keys(combinations.value)
  keys.forEach((key) => {
    ret[key] = combinations.value[key].map((e, i) => ({
      name: i + 1,
      color: e.toRgbString(),
    }))
  })
  return ret
})
</script>

<template>
  <n-card>
    <template #header>Color Combinations</template>
    <n-collapse>
      <n-collapse-item title="Analogous" name="Analogous">
        <n-space wrap>
          <n-input-group>
            <n-input-group-label>Numbers</n-input-group-label>
            <n-input-number
              v-model:value="models.analogous.results"
              :min="1"
              style="max-width: 100px"
            />
          </n-input-group>
          <n-input-group>
            <n-input-group-label>Slices</n-input-group-label>
            <n-input-number
              v-model:value="models.analogous.slices"
              :min="1"
              :step="5"
              style="max-width: 100px"
            />
          </n-input-group>
        </n-space>
        <ColorGroup
          colorName="Analogous"
          :colors="combinationsMapped.analogous"
          style="margin: 15px 0"
        />
      </n-collapse-item>

      <n-collapse-item title="Monochromatic" name="Monochromatic">
        <n-input-group>
          <n-input-group-label>Numbers</n-input-group-label>
          <n-input-number
            v-model:value="models.monochromatic"
            :min="1"
            style="max-width: 100px"
          />
        </n-input-group>
        <ColorGroup
          colorName="Monochromatic"
          :colors="combinationsMapped.monochromatic"
          style="margin: 15px 0"
        />
      </n-collapse-item>

      <n-collapse-item title="Polyad" name="Polyad">
        <n-input-group>
          <n-input-group-label>Numbers</n-input-group-label>
          <n-input-number
            v-model:value="models.polyad"
            :min="1"
            style="max-width: 100px"
          />
        </n-input-group>
        <ColorGroup
          colorName="Polyad"
          :colors="combinationsMapped.polyad"
          style="margin: 15px 0"
        />
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>
