import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollDirection(initial: 'up' | 'down' = 'down') {
  const scrollDir = ref(initial)
  let lastScrollY = window.pageYOffset

  const update = () => {
    const y = window.pageYOffset
    scrollDir.value = y > lastScrollY ? 'down' : 'up'
    lastScrollY = y > 0 ? y : 0
  }

  onMounted(() => window.addEventListener('scroll', update))
  onUnmounted(() => window.removeEventListener('scroll', update))

  return scrollDir
}
