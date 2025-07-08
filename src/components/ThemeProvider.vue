<script setup lang="ts">
import { provide } from 'vue'
import type { Theme } from '@/assets/theme'

const props = defineProps<{ theme: Theme }>()
provide('theme', props.theme)
</script>

<template>
  <slot />
</template>
