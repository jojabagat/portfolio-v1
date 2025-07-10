<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import sr from '@/utils/sr'
import { srConfig } from '@/config.js'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import { navDelay } from '@/utils/constants'

// const props = defineProps<{ isHeroDone: boolean }>()
const revealContainer = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

onMounted(async () => {
  if (prefersReducedMotion.value) return
  await nextTick()

  setTimeout(() => {
    if (revealContainer.value && sr) {
      sr.reveal(revealContainer.value, srConfig())
    }
  }, navDelay)
})
</script>

<template>
  <section class="about" id="about" ref="revealContainer">
    <h2 class="numbered-heading">About Me</h2>

    <div class="inner">
      <div class="styled-text">
        <div>
          <p>
            Hello! I am Josephine and I am an experienced software engineer for six years now. I’m a
            versatile full-stack developer with extensive experience building enterprise solutions
            using Vue.js and TypeScript. I’ve contributed to responsive, scalable applications while
            actively estimating development efforts and delivering technical enhancements aligned
            with Agile sprint goals.
          </p>

          <p>
            My role includes conducting thorough code and design reviews to ensure clean
            architecture, secure version control, and robust unit test coverage. I’ve successfully
            completed full-stack projects from requirements gathering to deployment using Java,
            TypeScript, PostgreSQL, and internal tools.
          </p>

          <p>
            I’ve collaborated closely with clients—including Japanese partners—for on-site
            requirements gathering and have worked across both Agile and Waterfall methodologies.
            Constantly adapting, I proactively study evolving technologies to meet client needs.
          </p>

          <p>
            In addition to development, I’ve built responsive websites using HubSpot CMS, integrated
            third-party APIs, performed pre-launch QA, and created high-fidelity design proposals
            with Adobe Photoshop.
          </p>
        </div>
      </div>

      <div class="style-pic">
        <div class="wrapper boxShadow">
          <img class="img" src="../images/me.png" width="500" alt="Headshot" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.about {
  max-width: 900px;
}

.about .inner {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 50px;
}

@media (max-width: 768px) {
  .about .inner {
    display: block;
  }
}

.style-pic {
  position: relative;
  max-width: 300px;
}

@media (max-width: 768px) {
  .style-pic {
    margin: 50px auto 0;
    width: 70%;
  }
}

.style-pic .wrapper {
  display: block;
  position: relative;
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--green);
}
.style-pic .wrapper:hover,
.style-pic .wrapper:focus {
  outline: 0;
  transform: translate(-4px, -4px);
}
.style-pic .wrapper:hover::after,
.style-pic .wrapper:focus::after {
  transform: translate(8px, 8px);
}

.style-pic .wrapper::before,
.style-pic .wrapper::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.style-pic .wrapper::before {
  top: 0;
  left: 0;
  background-color: var(--navy);
  mix-blend-mode: screen;
}

.style-pic .wrapper::after {
  border: 2px solid var(--green);
  top: 14px;
  left: 14px;
  z-index: -1;
}

.style-pic .wrapper .img {
  position: relative;
  border-radius: var(--border-radius);
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  transition: var(--transition);
}

.style-pic .wrapper:hover .img,
.style-pic .wrapper:focus .img {
  filter: none;
  mix-blend-mode: normal;
}
</style>
