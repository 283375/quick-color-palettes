<script setup>
import { NInputGroup, NInput, NButton } from 'naive-ui'
import { Copy24Regular } from '@vicons/fluent'

defineProps({ value: { type: String, required: true } })

const handleSelect = (e) => {
  e.target.select()
}
</script>

<template>
  <NInputGroup>
    <NInput v-model:value="value" readonly @focus="handleSelect" />
    <NButton
      secondary
      type="info"
      class="clipboard-enabled"
      :data-clipboard-text="value"
    >
      <template #icon>
        <Copy24Regular />
      </template>
      Copy
    </NButton>
  </NInputGroup>
</template>
