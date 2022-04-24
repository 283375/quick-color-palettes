<script setup>
import { NTabs, NTabPane, useMessage } from 'naive-ui'
import ClipboardJS from 'clipboard'

import PalettesPane from '@components/Palettes/_PalettesPane.vue'
import AlgorithmsPane from '@components/Algorithms/_AlgorithmsPane.vue'

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
  <NTabs type="card" animated>
    <NTabPane name="Palettes" display-directive="show">
      <PalettesPane />
    </NTabPane>
    <NTabPane name="Algorithms" display-directive="show:lazy">
      <AlgorithmsPane />
    </NTabPane>
  </NTabs>
</template>
