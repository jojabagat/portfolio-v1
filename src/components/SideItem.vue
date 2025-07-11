<template>
  <div class="side-element" :class="[orientation]" v-show="isVisible">
    <template v-if="prefersReducedMotion">
      <slot />
    </template>

    <transition name="fade" v-else>
      <div v-if="isMounted">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import { loaderDelay } from '@/utils/constants'

const props = defineProps({
  isHome: { type: Boolean, default: false },
  orientation: { type: String, default: 'left' },
})

const isMounted = ref(!props.isHome)
const prefersReducedMotion = usePrefersReducedMotion()

const isVisible = computed(() => {
  return !prefersReducedMotion.value || isMounted.value
})

onMounted(() => {
  if (!props.isHome || prefersReducedMotion.value) return

  setTimeout(() => {
    isMounted.value = true
  }, loaderDelay)
})
</script>

<style scoped>
.side-element {
  width: 40px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  color: var(--light-slate);
}

.side-element.left {
  left: 40px;
  right: auto;
}

.side-element.right {
  right: 40px;
  left: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1080px) {
  .side-element.left {
    left: 20px;
  }
  .side-element.right {
    right: 20px;
  }
}

@media (max-width: 768px) {
  .side-element {
    display: none;
  }
}
</style>
