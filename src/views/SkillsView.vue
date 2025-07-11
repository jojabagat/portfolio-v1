<template>
  <section class="skills" id="skills" ref="revealContainer">
    <h2 class="numbered-heading mb-10">Technical Skills & Tools</h2>

    <div class="inner">
      <div class="skill-tabs">
        <button
          v-for="(skill, index) in skillList"
          class="tab-button link"
          :key="skill.category"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ skill.category }}
        </button>
      </div>

      <Transition name="skill-fade-slide" mode="out-in">
        <div class="skill-tab-content" :key="activeTab">
          <ul class="skills-content">
            <li v-for="(item, i) in skillList[activeTab].tools" :key="i">
              <Icon :name="item" />
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { skillList } from '@/content/skills/skills'
import { Icon } from '@/components/icons'
import { navDelay } from '@/utils/constants'
import { srConfig } from '@/config'
import sr from '@/utils/sr'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'

const activeTab = ref(0)
const prefersReducedMotion = usePrefersReducedMotion()
const revealContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (prefersReducedMotion.value) return

  await nextTick()

  setTimeout(() => {
    if (revealContainer.value && sr) {
      sr.reveal(revealContainer.value, srConfig())
    }
  }, navDelay) // Slight delay prevents scroll-jump
})
</script>

<style scoped>
.skills {
  max-width: 700px;
}

.skill-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.skill-tabs > .tab-button {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: var(--text-subtle);
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
}

.skill-tabs > .tab-button:hover,
.skill-tabs > .tab-button.active {
  color: var(--green);
  border-bottom: 1px solid var(--green);
}

.skill-tab-content {
  padding: 20px;
  border-radius: 4px;
  animation: fadeIn 0.3s ease-in-out;
  color: var(--lightest-slate);
}

.skill-fade-slide-enter-active,
.skill-fade-slide-leave-active {
  transition: all 0.3s ease;
}

.skill-fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.skill-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.skills-content svg {
  width: 50px;
  height: 50px;
}

.skills-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: var(--text-main);
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-content li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* top-align for consistent spacing */
  width: 120px; /* wider for longer labels */
  min-height: 120px; /* fixed height for even boxes */
  text-align: center;
  margin: 10px;
}

.skills-content li p {
  color: inherit;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  line-height: 1.2;
  margin-top: 1rem;
  max-width: 100%; /* prevent tight squeeze */
  width: 100%; /* full width for proper wrapping */
  white-space: normal; /* allow wrapping */
  word-break: keep-all; /* ✅ prevents breaking inside words */
  overflow-wrap: break-word; /* fallback for long single words */
  text-align: center;
}

@media (max-width: 600px) {
  .skill-tab-content > .tab-button {
    font-size: var(--fz-xxs);
  }
  .skills-content svg {
    width: 30px;
    height: 30px;
  }
  .skills-content li {
    min-height: 100px;
    width: 100px;
  }
  .skills-content li p {
    font-size: var(--fz-xxs);
  }
  .skill-tab-content {
    padding: 10px 0px;
  }
  .skills-content {
    gap: 0;
  }
}

@media (max-width: 480px) {
  .skills-content li {
    width: 90px;
  }
  .skills-content li p {
    font-size: var(--fz-xxxs);
  }
}
</style>
