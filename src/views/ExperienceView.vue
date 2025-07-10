<template>
  <section class="experience" id="experience" ref="revealContainer">
    <h2 class="numbered-heading mb-10">Where I’ve Worked</h2>

    <div class="inner">
      <!-- Tabs -->
      <div class="tab-list" role="tablist" aria-label="Job tabs" @keydown="onKeyDown">
        <button
          v-for="(job, i) in experiences"
          :key="i"
          :ref="(el) => (tabs[i] = el as HTMLElement)"
          class="tab-button link"
          :class="{ active: activeTabId === i }"
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
        <div class="highlight" />
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
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { experiences } from '@/content/jobs/jobs'
import sr from '@/utils/sr'
import { srConfig } from '@/config'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import { KEY_CODES, navDelay } from '@/utils/constants'

const activeTabId = ref(0)
// const tabFocus = ref<number | null>(null)
const tabs = ref<HTMLElement[]>([])
const revealContainer = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()
const MOBILE_BREAK = 600
const isMobile = ref(false)
function checkResize() {
  isMobile.value = window.innerWidth <= MOBILE_BREAK
}

onMounted(async () => {
  checkResize()
  window.addEventListener('resize', checkResize)
  if (prefersReducedMotion.value) return

  await nextTick()

  setTimeout(() => {
    if (revealContainer.value && sr) {
      sr.reveal(revealContainer.value, srConfig())
    }
  }, navDelay) // Slight delay prevents scroll-jump
})

function focusTab(index: number) {
  const el = tabs.value[index]
  if (el) el.focus()
}

function onKeyDown(e: KeyboardEvent) {
  if (![KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN].includes(e.key)) return
  e.preventDefault()
  const dir = e.key === KEY_CODES.ARROW_UP ? -1 : +1
  const next = (activeTabId.value + dir + tabs.value.length) % tabs.value.length
  activeTabId.value = next
  focusTab(next)
}

// const highlightStyle = computed(() => ({
// transform: `translateY(calc(${activeTabId.value} * var(--tab-height)))`,
// const dimension = isMobile.value ? 'var(--tab-width)' : 'var(--tab-height)'
// return {
//   // '--tab-offset': `calc(${activeTabId.value} * ${dimension})`,
//   '--active-tab-id': activeTabId.value,
// }
// }))

onUnmounted(() => window.removeEventListener('resize', checkResize))
</script>

<style scoped>
.experience {
  max-width: 700px;
}
.inner {
  display: flex;
}
@media (max-width: 600px) {
  .experience .inner {
    display: block;
  }
  .tab-list {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  .tab-list .tab-button:first-of-type {
    margin-left: 50px;
  }
  .tab-list .tab-button:last-of-type {
    padding-right: 50px;
  }
  .tab-button {
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-width: 120px; */
    min-width: var(--tab-width);
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }
  .highlight {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(var(--active-tab-id) * var(--tab-width)));
  }
  .tab-panels {
    margin-left: 0;
  }
}

/* Prevent container from jumping */
@media (min-width: 700px) {
  .experience .inner {
    min-height: 340px;
  }
}

@media (max-width: 480px) {
  .tab-list {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }
  .tab-list .tab-button:first-of-type {
    margin-left: 25px;
  }
  .tab-list .tab-button:last-of-type {
    padding-right: 25px;
  }
  .highlight {
    margin-left: 25px;
  }
}

@media (max-width: 768px) {
  .tab-button {
    padding: 0 15px 2px;
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

.tab-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: var(--slate); /** isActive var(--green) */
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;
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

.tab-panels {
  position: relative;
  width: 100%;
  margin-left: 20px;
}

.tab-panel {
  width: 100%;
  height: auto;
  padding: 10px 5px;
}
.tab-panel h3 {
  margin-bottom: 2px;
  font-size: var(--fz-xxl);
  font-weight: 500;
  line-height: 1.3;
}
.tab-panel h3 .company {
  color: var(--green);
}

.tab-panel .range {
  margin-bottom: 25px;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
}
</style>
