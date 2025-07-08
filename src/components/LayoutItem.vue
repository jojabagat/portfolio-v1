<template>
  <HeadItem title="Home" description="Welcome to the homepage" />

  <div id="root">
    <!-- Skip link for accessibility -->
    <a class="skip-to-content" href="#content">Skip to Content</a>

    <ThemeProvider :theme="theme">
      <LoaderItem v-if="isLoading && isHome" :finish-loading="handleFinishLoading" />
      <div v-else class="styled-content" ref="layoutReveal">
        <NavItem :isHome="isHome" />
        <SocialsItem :isHome="isHome" />
        <EmailItem :isHome="isHome" />

        <div id="content" ref="contentReveal">
          <slot />
          <FooterItem />
        </div>
      </div>
    </ThemeProvider>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import theme from '@/assets/theme'
import { srConfig } from '@/config'
import sr from '@/utils/sr'
import { navDelay } from '@/utils/constants'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import HeadItem from './HeadItem.vue'
import NavItem from './NavItem.vue'
import SocialsItem from './SocialsItem.vue'
import EmailItem from './EmailItem.vue'
import FooterItem from './FooterItem.vue'
import ThemeProvider from './ThemeProvider.vue'
import LoaderItem from './LoaderItem.vue'

const route = useRoute()
const isHome = route.path === '/'
const isLoading = ref(isHome)
function handleFinishLoading() {
  isLoading.value = false
}

const layoutReveal = ref(null)
const contentReveal = ref(null)
const prefersReducedMotion = usePrefersReducedMotion()

// External link handler
const handleExternalLinks = () => {
  const allLinks = Array.from(document.querySelectorAll('a'))
  allLinks.forEach((link) => {
    if (link.host !== window.location.host) {
      link.setAttribute('rel', 'noopener noreferrer')
      link.setAttribute('target', '_blank')
    }
  })
}

// Scroll to hash after loading
watchEffect(() => {
  if (!isLoading.value) {
    handleExternalLinks()
  }
})

onMounted(async () => {
  if (prefersReducedMotion.value) return
  await nextTick()
  // Reveal layout first
  if (layoutReveal.value && sr) {
    sr.reveal(layoutReveal.value, srConfig())
  }

  // Then reveal main content after a delay
  setTimeout(() => {
    if (contentReveal.value && sr) {
      sr.reveal(contentReveal.value, srConfig())
    }
  }, navDelay) // adjust delay as needed

  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo(0, 0)
  }
})
</script>

<style>
.styled-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
