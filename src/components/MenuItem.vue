<template>
  <div class="menu">
    <!-- Add 'blur' class to body via side effect -->
    <div ref="wrapperRef">
      <!-- Hamburger Button -->
      <button
        ref="buttonRef"
        class="hamburger-button button"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <div class="ham-box">
          <div class="ham-box-inner" />
        </div>
      </button>

      <!-- Sidebar Menu -->
      <aside
        class="sidebar"
        :class="{ open: menuOpen }"
        :aria-hidden="!menuOpen"
        :tabindex="menuOpen ? 1 : -1"
      >
        <nav ref="navRef" class="flexBetween">
          <ol>
            <li v-for="(link, i) in navLinks" :key="i">
              <a :href="link.url" class="link" @click="closeMenu">{{ link.name }}</a>
            </li>
          </ol>
          <a
            href="/resume.pdf"
            class="resume-link bigButton"
            target="_blank"
            rel="noopener noreferrer"
            >Resume</a
          >
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { useRoute } from 'vue-router'
import { navLinks } from '@/config'
import { KEY_CODES } from '@/utils/constants'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

// Refs
const menuOpen = ref(false)
const buttonRef = ref<HTMLElement | null>(null)
const navRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)

// Focus trapping
let focusableEls: HTMLElement[] = []
let firstEl: HTMLElement | null = null
let lastEl: HTMLElement | null = null

useHead({
  bodyAttrs: computed(() => ({
    class: menuOpen.value ? 'blur' : '',
  })),
})

const setFocusables = () => {
  if (!navRef.value) return
  focusableEls = [buttonRef.value!, ...Array.from(navRef.value.querySelectorAll('a'))]
  firstEl = focusableEls[0]
  lastEl = focusableEls[focusableEls.length - 1]
}

const onKeyDown = (e: KeyboardEvent) => {
  if (!menuOpen.value) return

  switch (e.key) {
    case KEY_CODES.ESCAPE:
    case KEY_CODES.ESCAPE_IE11:
      closeMenu()
      break
    case KEY_CODES.TAB:
      if (focusableEls.length <= 1) {
        e.preventDefault()
        break
      }
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl?.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl?.focus()
      }
      break
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onResize: any = () => {
  if (window.innerWidth > 768) closeMenu()
}

// Detect outside click
const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('resize', onResize)
  document.addEventListener('mousedown', handleClickOutside)
  setFocusables()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style>
.menu {
  display: none;
}
@media (max-width: 768px) {
  .menu {
    display: block;
  }
}

.hamburger-button {
  display: none;
}
@media (max-width: 768px) {
  .hamburger-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }
}

.ham-box {
  display: inline-block;
  position: relative;
  width: var(--hamburger-width);
  height: 24px;
}

.ham-box-inner {
  position: absolute;
  top: 50%;
  right: 0;
  width: var(--hamburger-width);
  height: 2px;
  border-radius: var(--border-radius);
  background-color: var(--green);
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: 0s;
  transform: rotate(0deg);
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger-button.open .ham-box-inner {
  transition-delay: 0.12s;
  transform: rotate(225deg);
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

.ham-box-inner::before,
.ham-box-inner::after {
  content: '';
  display: block;
  position: absolute;
  left: auto;
  right: 0;
  width: var(--hamburger-width);
  height: 2px;
  border-radius: 4px;
  background-color: var(--green);
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
}

.hamburger-button.open .ham-box-inner::before {
  width: 100%;
  top: 0;
  opacity: 0;
  transition: var(--ham-before-active);
}
.hamburger-button.open .ham-box-inner::after {
  width: 100%;
  bottom: 0;
  transform: rotate(-90deg);
  transition: var(--ham-after-active);
}

.ham-box-inner::before {
  width: 120%;
  top: -10px;
  opacity: 1;
  transition: var(--ham-before);
}
.ham-box-inner::after {
  width: 80%;
  bottom: -10px;
  transform: rotate(0);
  transition: var(--ham-after);
}

.sidebar {
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: var(--light-navy);
    box-shadow: -10px 0px 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(100vw);
    visibility: hidden;
    transition: var(--transition);
  }
  .sidebar.open {
    transform: translateX(0vw);
    visibility: visible;
  }
}

.sidebar > nav {
  width: 100%;
  flex-direction: column;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  text-align: center;
}

.sidebar ol {
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
}

.sidebar ol li {
  position: relative;
  margin: 0 auto 20px;
  counter-increment: item 1;
  font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));
}

@media (max-width: 600px) {
  .sidebar ol li {
    margin: 0 auto 10px;
  }
}

.sidebar ol li::before {
  content: '0' counter(item) '.';
  display: block;
  margin-bottom: 5px;
  color: var(--green);
  font-size: var(--fz-sm);
}

.sidebar ol li a {
  width: 100%;
  padding: 3px 20px 20px;
}

.resume-link {
  padding: 18px 50px;
  margin: 10% auto 0;
  width: max-content;
}
</style>
