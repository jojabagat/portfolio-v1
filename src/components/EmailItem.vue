<template>
  <SideItem :isHome="isHome" orientation="right">
    <div class="email-wrapper">
      <a :href="`mailto:${emailAd}`">{{ emailAd }}</a>
    </div>
  </SideItem>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import SideItem from './SideItem.vue'
import { emailAd } from '@/config'

defineProps<{ isHome?: boolean }>()
</script>

<style scoped>
.email-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.email-wrapper::after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: var(--light-slate);
}

.email-wrapper a {
  margin: 20px auto;
  padding: 10px;
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: var(--fz-lg);
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  transition: transform 0.2s ease-in-out;
}

.email-wrapper a:hover,
.email-wrapper a:focus {
  transform: translateY(-3px);
}
</style>
