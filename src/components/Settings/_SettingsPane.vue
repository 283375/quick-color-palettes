<script setup>
import { NTabs, NTabPane } from 'naive-ui'

import TabAbout from './About.vue'
</script>

<template>
  <n-tabs>
    <n-tab-pane name="About">
      <TabAbout />
    </n-tab-pane>
  </n-tabs>
</template>
