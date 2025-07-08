<template>
  <section class="experience" id="experience" ref="revealContainer">
    <h2 class="numbered-heading mb-10">Where I’ve Worked</h2>

    <div class="inner">
      <!-- Tabs -->
      <div class="tab-list" role="tablist" aria-label="Job tabs" @keydown="onKeyDown">
        <button
          v-for="(job, i) in experiences"
          :key="i"
          ref="tabRefs"
          class="tab-button link"
          :style="{ color: activeTabId === i ? 'var(--green)' : 'var(--slate)' }"
          @click="activeTabId = i"
          role="tab"
          :id="`tab-${i}`"
          :tabindex="activeTabId === i ? '0' : '-1'"
          :aria-selected="activeTabId === i"
          :aria-controls="`panel-${i}`"
        >
          {{ job.frontmatter.company }}
        </button>

        <!-- Highlight -->
        <div class="highlight" :style="highlightStyle" :activeTabId="activeTabId" />
      </div>

      <!-- Panels -->
      <div class="tab-panels">
        <Transition name="fade" mode="out-in">
          <div
            v-if="experiences[activeTabId]"
            :key="activeTabId"
            class="tab-panel"
            :id="`panel-${activeTabId}`"
            role="tabpanel"
            tabindex="0"
            :aria-labelledby="`tab-${activeTabId}`"
          >
            <h3>
              <span>{{ experiences[activeTabId].frontmatter.title }}</span>
              <span class="company">
                &nbsp;@&nbsp;
                <a :href="experiences[activeTabId].frontmatter.url" class="inline-link">
                  {{ experiences[activeTabId].frontmatter.company }}
                </a>
              </span>
            </h3>

            <p class="range">{{ experiences[activeTabId].frontmatter.range }}</p>

            <div v-html="experiences[activeTabId].html"></div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import { experiences } from '@/content/jobs/jobs'
import sr from '@/utils/sr'
import { srConfig } from '@/config'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import { KEY_CODES, navDelay } from '@/utils/constants'

const activeTabId = ref(0)
const tabFocus = ref<number | null>(null)
const tabs = ref<(HTMLElement | null)[]>([])
const tabRefs = ref<HTMLElement[]>([])
const revealContainer = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()
const isMobile = ref(false)

function checkScreen() {
  isMobile.value = window.innerWidth <= 600
}

onMounted(async () => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
  if (prefersReducedMotion.value) return

  await nextTick()

  setTimeout(() => {
    if (revealContainer.value && sr) {
      sr.reveal(revealContainer.value, srConfig())
    }
  }, navDelay) // Slight delay prevents scroll-jump
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})

function focusTab() {
  if (tabFocus.value === null) return

  const currentTab = tabs.value[tabFocus.value]
  if (currentTab) {
    currentTab!.focus({ preventScroll: true })
    return
  }
  if (tabFocus.value >= tabs.value.length) {
    tabFocus.value = 0
  }
  if (tabFocus.value < 0) {
    tabFocus.value = tabs.value.length - 1
  }
}

// Watch tabFocus changes to focus the tab
watch(tabFocus, () => {
  focusTab()
})

function onKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case KEY_CODES.ARROW_UP:
      e.preventDefault()
      if (tabFocus.value !== null) tabFocus.value -= 1
      break
    case KEY_CODES.ARROW_DOWN:
      e.preventDefault()
      if (tabFocus.value !== null) tabFocus.value += 1
      break
  }
}

const highlightStyle = computed(() => {
  const dimension = isMobile.value ? 'var(--tab-width)' : 'var(--tab-height)'
  return {
    '--tab-offset': `calc(${activeTabId.value} * ${dimension})`,
    '--active-tab-id': activeTabId.value,
  }
})
</script>

<style scoped>
.experience {
  max-width: 700px;
}
.experience .inner {
  display: flex;
}
@media (max-width: 600px) {
  .experience .inner {
    display: block;
  }
}

/* Prevent container from jumping */
@media (min-width: 700px) {
  .experience .inner {
    min-height: 340px;
  }
}

.tab-list {
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
}
@media (max-width: 600px) {
  .tab-list {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
}
@media (max-width: 480px) {
  .tab-list {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }
}

@media (max-width: 600px) {
  .tab-list > li:first-of-type {
    margin-left: 50px;
  }
}
@media (max-width: 480px) {
  .tab-list > li:first-of-type {
    margin-left: 25px;
  }
}
@media (max-width: 600px) {
  .tab-list > li:last-of-type {
    padding-right: 50px;
  }
}
@media (max-width: 480px) {
  .tab-list > li:last-of-type {
    padding-right: 25px;
  }
}

.tab-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: var(--slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .tab-button {
    padding: 0 15px 2px;
  }
}
@media (max-width: 600px) {
  .tab-button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }
}

.tab-button:hover,
.tab-button:focus {
  background-color: var(--light-navy);
}

.tab-button.active {
  color: var(--green);
}

.highlight {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(var(--active-tab-id) * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
}
@media (max-width: 600px) {
  .highlight {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(var(--active-tab-id) * var(--tab-width)));
  }
}
@media (max-width: 480px) {
  .highlight {
    margin-left: 25px;
  }
}

.tab-panels {
  position: relative;
  width: 100%;
  margin-left: 20px;
}
@media (max-width: 600px) {
  .tab-panels {
    margin-left: 0;
  }
}

.tab-panel {
  width: 100%;
  height: auto;
  padding: 10px 5px;
}
.tab-panel > h3 {
  margin-bottom: 2px;
  font-size: var(--fz-xxl);
  font-weight: 500;
  line-height: 1.3;
}
.tab-panel > h3.company {
  color: var(--green);
}

.tab-panel.range {
  margin-bottom: 25px;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
}
</style>
