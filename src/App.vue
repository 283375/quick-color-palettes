<script setup>
import { NTabs, NTabPane, useMessage } from 'naive-ui'
import ClipboardJS from 'clipboard'

import PalettesPane from '@components/Palettes/_PalettesPane.vue'
import AlgorithmsPane from '@components/Algorithms/_AlgorithmsPane.vue'
import UtilsPane from '@components/Utils/_UtilsPane.vue'
import SettingsPane from '@components/Settings/_SettingsPane.vue'

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
  <n-tabs type="card" animated>
    <n-tab-pane name="Palettes" display-directive="show">
      <PalettesPane />
    </n-tab-pane>
    <n-tab-pane name="Algorithms" display-directive="show:lazy">
      <AlgorithmsPane />
    </n-tab-pane>
    <n-tab-pane name="Utils" display-directive="show:lazy">
      <UtilsPane />
    </n-tab-pane>
    <n-tab-pane name="Settings" display-directive="show:lazy">
      <SettingsPane />
    </n-tab-pane>
  </n-tabs>
</template>
