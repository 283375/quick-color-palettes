<script setup>
import { ref } from 'vue'
import { NTabs, NTabPane, useMessage } from 'naive-ui'
import ClipboardJS from 'clipboard'

import PalettesPane from '@components/Palettes/_PalettesPane.vue'
import AlgorithmsPane from '@components/Algorithms/_AlgorithmsPane.vue'

const currentTab = ref('palettes')

const message = useMessage()
const clipboard = new ClipboardJS('.clipboard-enabled')
clipboard.on('success', function (e) {
  message.success(`value copied: ${e.text}`)
})

clipboard.on('error', function (e) {
  message.error('copy error, see console for details.')
  console.error(e)
})
</script>

<template>
  <NTabs v-model:value="currentTab" type="card" animated>
    <NTabPane name="palettes">
      <PalettesPane />
    </NTabPane>
    <NTabPane name="algorithms">
      <AlgorithmsPane />
    </NTabPane>
  </NTabs>
</template>
