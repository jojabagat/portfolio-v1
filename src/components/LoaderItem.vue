<template>
  <div class="loader flexCenter" :class="{ mounted: isMounted }">
    <div class="logo-wrapper">
      <IconLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import anime from 'animejs'
import { IconLoader } from './icons'

const props = defineProps({
  finishLoading: {
    type: Function,
    required: true,
  },
})

const isMounted = ref(false)

const animate = () => {
  const loader = anime.timeline({
    complete: () => props.finishLoading(),
  })

  loader
    .add({
      targets: '#logo path',
      delay: 300,
      duration: 1500,
      easing: 'easeInOutQuart',
      strokeDashoffset: [anime.setDashoffset, 0],
    })
    .add({
      targets: '#logo #J',
      duration: 700,
      easing: 'easeInOutQuart',
      opacity: 1,
    })
    .add({
      targets: '#logo',
      delay: 500,
      duration: 300,
      easing: 'easeInOutQuart',
      opacity: 0,
      scale: 0.1,
    })
    .add({
      targets: '.loader',
      duration: 200,
      easing: 'easeInOutQuart',
      opacity: 0,
      zIndex: -1,
    })
}

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true
  }, 10)
  animate()
})
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;
}

.logo-wrapper {
  width: max-content;
  max-width: 100px;
  transition: var(--transition);
  opacity: 0;
}
svg {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  fill: none;
  user-select: none;
}
svg#J {
  opacity: 0;
}

.loader.mounted .logo-wrapper {
  opacity: 1;
}
</style>
