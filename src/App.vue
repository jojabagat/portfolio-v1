<template>
  <LayoutItem>
    <main class="main-container fillHeight">
      <HeroItem @animation-complete="isHeroDone = true" />
      <template v-if="isHeroDone">
        <AboutView />
        <ExperienceView />
        <WorksView />
        <SkillsView />
        <ContactView />
      </template>
    </main>
  </LayoutItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeroItem from '@/components/HeroItem.vue'
import ExperienceView from './views/ExperienceView.vue'
import AboutView from './views/AboutView.vue'
import WorksView from './views/WorksView.vue'
import ContactView from './views/ContactView.vue'
import LayoutItem from './components/LayoutItem.vue'
import SkillsView from './views/SkillsView.vue'

const isHeroDone = ref(false)
</script>

<style>
.main-container {
  counter-reset: section;
}
</style>
