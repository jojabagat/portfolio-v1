<template>
  <footer class="footer flexCenter">
    <!-- Social Links -->
    <div class="social-links">
      <ul>
        <li v-for="({ name, url }, i) in socialMedia" :key="i">
          <a :href="url" :aria-label="name">
            <Icon :name="name" />
          </a>
        </li>
      </ul>
    </div>

    <!-- Credit -->
    <div class="credit" tabindex="-1">
      <a href="https://github.com/bchiang7/v4" target="_blank" rel="noopener noreferrer">
        <div>
          Implemented using TypeScript + Vue.js based on a React (via Gatsby) website by Brittany
          Chiang
        </div>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { socialMedia } from '@/config'
import { Icon } from './icons'

onMounted(() => {
  if (import.meta.env.MODE !== 'production') return
})
</script>

<style scoped>
.footer {
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
}

.social-links {
  display: none;
}

@media (max-width: 768px) {
  .social-links {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  .social-links ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .social-links ul a {
    padding: 10px;
  }

  .social-links ul a svg {
    width: 20px;
    height: 20px;
  }
}

.credit {
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
}

.credit a {
  padding: 10px;
}

.github-stats {
  margin-top: 10px;
}

.github-stats > span {
  display: inline-flex;
  align-items: center;
  margin: 0 7px;
}

.github-stats svg {
  display: inline-block;
  margin-right: 5px;
  width: 14px;
  height: 14px;
}
</style>
