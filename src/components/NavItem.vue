<template>
  <header
    class="nav-header"
    :class="{
      'scroll-up': scrollDirection === 'up' && !scrolledToTop,
      'scroll-down': scrollDirection === 'down' && !scrolledToTop,
      'scrolled-to-top': scrolledToTop,
    }"
    ref="revealContainer"
  >
    <nav class="nav-content flexBetween">
      <template v-if="prefersReducedMotion">
        <component :is="Logo" />

        <div class="nav-links">
          <ol class="nav-links-ol">
            <li v-for="(link, i) in navLinks" :key="i">
              <a class="nav-links-a" :href="link.url">{{ link.name }}</a>
            </li>
          </ol>
          <div>
            <component :is="ResumeLink" />
          </div>
        </div>

        <MenuItem />
      </template>

      <template v-else-if="!prefersReducedMotion && isMounted">
        <Transition tag="div" name="fade">
          <component :is="Logo" :style="{ '--transition-duration': timeout + 'ms' }" />
        </Transition>

        <div class="nav-links">
          <TransitionGroup
            tag="ol"
            class="nav-links-ol"
            name="fadedown"
            v-if="isMounted && navLinks"
          >
            <li
              v-for="(link, i) in navLinks"
              :key="i"
              :style="{
                transitionDelay: `${i * 100}ms`,
                '--transition-duration': timeout + 'ms',
              }"
            >
              <a class="nav-links-a" :href="link.url">{{ link.name }}</a>
            </li>
          </TransitionGroup>
          <!-- </ol> -->

          <TransitionGroup tag="div" name="fadedown" v-if="isMounted">
            <div
              v-if="isMounted"
              :style="{
                transitionDelay: `${navLinks.length * 100}ms`,
                '--transition-duration': timeout + 'ms',
              }"
            >
              <component :is="ResumeLink" />
            </div>
          </TransitionGroup>
        </div>

        <Transition name="fade" v-if="isMounted">
          <MenuItem v-if="isMounted" :style="{ '--transition-duration': timeout + 'ms' }" />
        </Transition>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { h, ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { IconHex, IconLogo } from './icons'
import MenuItem from './MenuItem.vue'
import { navLinks, srConfig } from '@/config'
import { loaderDelay, navDelay } from '@/utils/constants'
import { RouterLink } from 'vue-router'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import sr from '@/utils/sr'

// Props
const props = defineProps<{ isHome: boolean }>()
const revealContainer = ref<HTMLElement | null>(null)

// State
const isMounted = ref(!props.isHome)
const scrolledToTop = ref(true)
const scrollDirection = ref<'up' | 'down'>('down')
const timeout = loaderDelay
const prefersReducedMotion = usePrefersReducedMotion()

const Logo = computed(() =>
  h('div', { class: 'logo flexCenter', tabindex: '-1' }, [
    props.isHome
      ? h('a', { href: '/', 'aria-label': 'home' }, [
          h('div', { class: 'logo-container' }, [h(IconLogo)]),
          h('div', { class: 'hex-container' }, [h(IconHex)]),
        ])
      : h(
          RouterLink,
          { to: '/', 'aria-label': 'home' },
          {
            default: () => [
              h('div', { class: 'logo-container' }, [h(IconLogo)]),
              h('div', { class: 'hex-container' }, [h(IconHex)]),
            ],
          },
        ),
  ]),
)

const ResumeLink = computed(() =>
  h(
    'a',
    {
      class: 'resume-button smallButton',
      href: '/resume.pdf',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    'Resume',
  ),
)

// Scroll logic
const lastScrollY = ref(window.pageYOffset)

const handleScroll = () => {
  const currentScroll = window.pageYOffset
  scrolledToTop.value = currentScroll < 50
  scrollDirection.value = currentScroll > lastScrollY.value ? 'down' : 'up'
  lastScrollY.value = currentScroll
}

// Mount effects
onMounted(async () => {
  if (prefersReducedMotion.value) {
    isMounted.value = true
    return
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()

  await nextTick()

  setTimeout(() => {
    isMounted.value = true
    if (revealContainer.value && sr) sr.reveal(revealContainer.value, srConfig())
  }, navDelay)

  // Cleanup
  onUnmounted(() => {
    clearTimeout(timeout)
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style>
.sr-nav-item {
  opacity: 0;
}
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);
}

.nav-content {
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: link;
  z-index: 12;
}

.logo > a {
  color: var(--green);
  width: 42px;
  height: 42px;
  position: relative;
  z-index: 1;
}
.logo a .hex-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.logo-container {
  position: relative;
  z-index: 1;
}
.logo-container svg {
  fill: none;
  user-select: none;
}

.logo-container svg polygon {
  fill: var(--navy);
}

.logo > a:hover,
.logo > a:focus {
  outline: 0;
  transform: translate(-4px, -4px);
}
.logo > a:hover .hex-container,
.logo > a:focus .hex-container {
  transform: translate(4px, 3px);
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links-ol {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}
.nav-links-ol > li {
  margin: 0 5px;
  position: relative;
  font-size: var(--fz-xs);
}
.nav-links-ol > li a.nav-links-a {
  padding: 10px;
}
.nav-links-ol > li a.nav-links-a::before {
  counter-increment: link;
  content: '0' counter(link) '.';
  margin-right: 5px;
  color: var(--green);
  font-size: var(--fz-xxs);
  text-align: right;
}

.resume-button {
  margin-left: 15px;
  font-size: var(--fz-xs);
}

@media (max-width: 1080px) {
  .nav-header {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .nav-header {
    padding: 0 25px;
  }
  .nav-links {
    display: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .nav-header.scroll-up:not(.scrolled-to-top) {
    height: var(--nav-scroll-height);
    transform: translateY(0px);
    background-color: rgba(10, 25, 47, 0.85);
    box-shadow: 0 10px 30px -10px var(--navy-shadow);
  }
  .nav-header.scroll-down:not(.scrolled-to-top) {
    height: var(--nav-scroll-height);
    transform: translateY(calc(var(--nav-scroll-height) * -1));
    box-shadow: 0 10px 30px -10px var(--navy-shadow);
  }
  .logo a .hex-container {
    transition: var(--transition);
  }
  .logo-container svg {
    transition: var(--transition);
  }
}
</style>
