// composables/usePrefersReducedMotion.js
import { ref, onMounted, onUnmounted } from 'vue'

const QUERY = '(prefers-reduced-motion: no-preference)'

export function usePrefersReducedMotion() {
  const isClient = typeof window !== 'undefined'
  const prefersReducedMotion = ref(isClient ? !window.matchMedia(QUERY).matches : true)

  let mediaQueryList: MediaQueryList

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePreference = (event: { matches: any }) => {
    prefersReducedMotion.value = !event.matches
  }

  onMounted(() => {
    if (!isClient) return
    mediaQueryList = window.matchMedia(QUERY)
    mediaQueryList.addEventListener('change', updatePreference)
  })

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', updatePreference)
    }
  })

  return prefersReducedMotion
}
