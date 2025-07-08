<template>
  <SideItem :isHome="isHome" orientation="left">
    <ul class="social-list">
      <li v-for="(item, i) in socialMedia" :key="i">
        <a :href="item.url" :aria-label="item.name" target="_blank" rel="noreferrer">
          <Icon :name="item.name" />
        </a>
      </li>
    </ul>
  </SideItem>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import SideItem from './SideItem.vue'
import { Icon } from './icons'
import { socialMedia } from '@/config'

defineProps<{
  isHome?: boolean
}>()
</script>

<style scoped>
.social-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.social-list::after {
  content: '';
  display: block;
  width: 1px;
  height: 90px;
  margin: 0 auto;
  background-color: var(--light-slate);
}

.social-list li:last-of-type {
  margin-bottom: 20px;
}

.social-list a {
  padding: 10px;
  transition: transform 0.3s;
}

.social-list a:hover,
.social-list a:focus {
  transform: translateY(-3px);
}

.social-list svg {
  width: 20px;
  height: 20px;
}
</style>
