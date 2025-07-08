<template>
  <section
    class="hero-section flexCenter"
    ref="revealContainer"
    :class="{ 'is-hidden': !isMounted, 'is-visible': isMounted }"
    v-if="!prefersReducedMotion"
  >
    <div v-for="(item, i) in items" :key="i" class="reveal-item">
      <component :is="item.tag" :class="item.class" :href="item.href">
        {{ item.text }}
      </component>
    </div>
  </section>

  <!-- Reduced motion fallback -->
  <section class="hero-section flexCenter" ref="revealContainer" v-else>
    <component
      v-for="(item, i) in items"
      :key="i"
      :is="item.tag"
      :class="item.class"
      :href="item.href"
    >
      {{ item.text }}
    </component>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { navDelay, loaderDelay } from '@/utils/constants'
import sr from '@/utils/sr'
import { srConfig } from '@/config'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'

const revealContainer = ref<HTMLElement | null>(null)
// Prefers reduced motion (simplified for Vue)
const prefersReducedMotion = usePrefersReducedMotion()
const isMounted = ref(false)

const emit = defineEmits(['animation-complete'])

onMounted(async () => {
  if (prefersReducedMotion.value) {
    emit('animation-complete')
    return
  }

  await nextTick()
  setTimeout(() => {
    isMounted.value = true
    sr?.reveal('.reveal-item', srConfig())
    emit('animation-complete')
  }, navDelay)
})

// Content setup
const items = [
  { tag: 'h1', text: 'Hi, my name is' },
  { tag: 'h2', text: 'Josephine Jabagat.', class: 'big-heading' },
  {
    tag: 'h3',
    text: 'I design and build web and system software solutions.',
    class: 'big-heading',
  },
  {
    tag: 'p',
    text: 'I specialize in developing web applications using TypeScript, Java, and PostgreSQL. I’m passionate about clean architecture, API design, and working across Agile teams to solve complex problems.',
  },
  {
    tag: 'a',
    text: 'Check out my work',
    class: 'email-link bigButton',
    href: '#about',
  },
]
</script>

<style>
.hero-section {
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
}
@media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
  .hero-section {
    height: auto;
    padding-top: var(--nav-height);
  }
}

.hero-section.is-hidden {
  opacity: 0;
  visibility: hidden;
}

.hero-section.is-visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;
}

.hero-section h1 {
  margin: 0 0 30px 4px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
  font-weight: 400;
}
@media (max-width: 480px) {
  .hero-section h1 {
    margin: 0 0 20px 2px;
  }
}

.hero-section h3 {
  margin-top: 5px;
  color: var(--slate);
  line-height: 0.9;
}

.hero-section p {
  margin: 20px 0 0;
  max-width: 540px;
}

.hero-section a.email-link {
  margin-top: 50px;
}
</style>
