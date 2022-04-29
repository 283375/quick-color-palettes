<script setup>
import { NTabs, NTabPane } from 'naive-ui'

import QuickColorPicker from './QuickColorPicker.vue'
</script>

<template>
  <n-tabs>
    <n-tab-pane name="Quick color picker">
      <quick-color-picker />
    </n-tab-pane>
  </n-tabs>
</template>
