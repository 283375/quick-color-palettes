<script setup>
import { NTabs, NTabPane } from 'naive-ui'

import QuickColorPicker from './QuickColorPicker/Entry.vue'
</script>

<template>
  <n-tabs>
    <n-tab-pane name="Quick color picker">
      <QuickColorPicker />
    </n-tab-pane>
  </n-tabs>
</template>
