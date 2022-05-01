<script setup>
import { ref, computed } from 'vue'
import {
  NCard,
  NForm,
  NGrid,
  NFormItemGridItem,
  NColorPicker,
  NSwitch,
  NSpace,
  useThemeVars,
} from 'naive-ui'
import { TinyColor, readability, isReadable } from '@ctrl/tinycolor'

const props = defineProps({
  colorInstance: {
    type: TinyColor,
    required: true,
  },
})

const textColor = ref('#000000')
const textColorInstance = computed(() => new TinyColor(textColor.value))
const level = ref('AA')
const size = ref('small')

const readabilityVal = computed(() =>
  readability(textColorInstance.value, props.colorInstance)
)
const readable = computed(() =>
  isReadable(textColorInstance.value, props.colorInstance, {
    level: level.value,
    size: size.value,
  })
)

const themeVars = useThemeVars()
</script>

<template>
  <n-card>
    <template #header>Readability</template>

    <n-form>
      <n-grid cols="2">
        <n-form-item-grid-item label="Text Color" span="2">
          <n-color-picker
            v-model:value="textColor"
            placement="top-start"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item label="Level">
          <n-switch
            v-model:value="level"
            checked-value="AAA"
            unchecked-value="AA"
            style="margin-left: 5px"
          >
            <template #checked>AAA</template>
            <template #unchecked>AA</template>
          </n-switch>
        </n-form-item-grid-item>
        <n-form-item-grid-item label="Size">
          <n-switch
            v-model:value="size"
            checked-value="large"
            unchecked-value="small"
            style="margin-left: 5px"
          >
            <template #checked>large</template>
            <template #unchecked>small</template>
          </n-switch>
        </n-form-item-grid-item>
      </n-grid>
    </n-form>

    <n-space vertical style="margin-bottom: 10px">
      <div>
        <span>Readability: {{ readabilityVal }}</span>
      </div>
      <div>
        <span>Readable: </span>
        <span v-if="readable" :style="{ color: themeVars.successColor }">
          true
        </span>
        <span v-else :style="{ color: themeVars.errorColor }">false</span>
      </div>
    </n-space>

    <div>
      <div
        :style="{
          maxWidth: '100%',
          padding: '10px 20px',
          color: textColorInstance.toRgbString(),
          backgroundColor: colorInstance.toRgbString(),
          fontSize: size === 'large' ? '2em' : '1em',
        }"
      >
        Preview text here.<br />
        Lorem ipsum dolor sit amet te dolor, ut nulla luptatum mazim dolores
        quis dolore sed, clita sit ea erat.
      </div>
    </div>
  </n-card>
</template>
