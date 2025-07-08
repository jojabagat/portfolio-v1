<template>
  <aside class="sidebar">
    <button class="button" @click="goTo('/')">Home</button>
    <button class="button" @click="goTo('/experience')">Experience</button>
    <button class="button" @click="goTo('/works')">Works</button>
    <button class="button" @click="goTo('/contact')">Contact</button>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.sidebar {
  width: 40px;
  position: fixed;
  bottom: 0;
  /* left: ${props => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '40px')}; */
  z-index: 10;
  color: var(--light-slate);
}
/* @media (max-width: 1080px) {
    .sidebar
    {left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '20px')};}
  } */

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
