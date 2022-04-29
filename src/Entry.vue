<script setup>
import { computed } from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  useOsTheme,
  darkTheme,
  NLayout,
  NLayoutContent,
} from 'naive-ui'

import App from './App.vue'

const osThemeRef = useOsTheme()
const currentTheme = computed(() =>
  osThemeRef.value === 'dark' ? darkTheme : null
)
</script>

<template>
  <n-config-provider :theme="currentTheme">
    <n-message-provider>
      <n-layout style="min-height: 100vh">
        <n-layout-content :content-style="{ padding: '15px' }">
          <App />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>
