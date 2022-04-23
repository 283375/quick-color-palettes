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
  <NConfigProvider :theme="currentTheme">
    <NMessageProvider>
      <NLayout style="min-height: 100vh">
        <NLayoutContent :content-style="{ padding: '15px' }">
          <App />
        </NLayoutContent>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>
