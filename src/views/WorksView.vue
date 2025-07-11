<template>
  <section id="works" ref="revealContainer">
    <h2 className="numbered-heading">Some Things I’ve Built</h2>

    <ul class="projects-grid resetList">
      <li
        v-for="(project, i) in featuredProjects"
        :key="i"
        class="project"
        :ref="(el) => setProjRef(el, i)"
      >
        <div class="project-content">
          <div>
            <p class="project-overline">Featured Project</p>

            <h3 class="project-title">
              <a :href="project.frontmatter.external">{{ project.frontmatter.title }}</a>
            </h3>

            <div class="project-description boxShadow" v-html="project.html"></div>

            <ul
              class="project-tech-list"
              v-if="project.frontmatter.tech && project.frontmatter.tech.length"
            >
              <li v-for="(tech, index) in project.frontmatter.tech" :key="index">
                {{ tech }}
              </li>
            </ul>

            <div class="project-links">
              <a
                v-if="project.frontmatter.external"
                :href="project.frontmatter.external"
                aria-label="External Link"
                class="external"
                target="_blank"
              >
                <ExternalIcon />
              </a>
            </div>
          </div>
        </div>

        <div class="project-image boxShadow">
          <a :href="project.frontmatter.external || '#'">
            <img
              :src="project.frontmatter.cover.childImageSharp.gatsbyImageData"
              :alt="project.frontmatter.title"
              class="img"
            />
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, type ComponentPublicInstance } from 'vue'
import sr from '@/utils/sr'
import { srConfig } from '@/config'
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'

// Simulate static query (replace with actual data source)
import { projects } from '@/content/projects/projects'
import ExternalIcon from '@/components/icons/ExternalIcon.vue'
import { navDelay } from '@/utils/constants'

const featuredProjects = ref(projects)
const revealContainer = ref<HTMLElement | null>(null)
const revealProjRefs = ref<HTMLElement[]>([])
const prefersReducedMotion = usePrefersReducedMotion()

function setProjRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    revealProjRefs.value[index] = el
  }
}

onMounted(() => {
  if (prefersReducedMotion.value) return
  setTimeout(() => {
    if (sr && revealContainer.value) {
      sr.reveal(revealContainer.value, srConfig())
    }

    revealProjRefs.value.forEach((el, i) => {
      if (el && sr) {
        sr.reveal(el, srConfig(i * 100)) // stagger reveal
      }
    })
  }, navDelay)
})
</script>

<style scoped>
/** StyledProjectsGrid */
ul.projects-grid a {
  position: relative;
  z-index: 1;
}

/* StyledProject */
li.project {
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
}

li.project:not(:last-of-type) {
  margin-bottom: 100px;
}

li.project:nth-of-type(odd) .project-content {
  grid-column: 7 / -1;
  text-align: right;
}
li.project:nth-of-type(odd) .project-tech-list {
  justify-content: flex-end;
}

li.project:nth-of-type(odd) .project-tech-list li {
  margin: 0 0 5px 20px;
}

li.project:nth-of-type(odd) .project-links {
  justify-content: flex-end;
  margin-left: 0;
  margin-right: -10px;
}

li.project:nth-of-type(odd) .project-image {
  grid-column: 1 / 8;
}

.project-content {
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
}

.project-overline {
  margin: 10px 0;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  font-weight: 400;
}

.project-title {
  color: var(--lightest-slate);
  font-size: clamp(24px, 5vw, 28px);
}

.project-description {
  position: relative;
  z-index: 2;
  padding: 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: var(--light-slate);
  font-size: var(--fz-lg);
}

.project-description strong {
  color: var(--white);
  font-weight: normal;
}

.project-tech-list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  margin: 25px 0 10px;
  padding: 0;
  list-style: none;
}
.project-tech-list li {
  margin: 0 20px 5px 0;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  white-space: nowrap;
}

.project-links {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: var(--lightest-slate);
}
.project-links a {
  padding: 10px;
}
.project-links a.external svg {
  width: 22px;
  height: 22px;
  margin-top: -4px;
}

.project-links a svg {
  width: 20px;
  height: 20px;
}
.project-links .cta {
  margin: 10px;
}

.project-image {
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
}

.project-image a {
  width: 100%;
  height: 100%;
  background-color: var(--green);
  border-radius: var(--border-radius);
  vertical-align: middle;
}
.project-image a:hover,
.project-image a:focus {
  background: transparent;
  outline: 0;
}
.project-image a:hover::before,
.project-image a:focus::before,
.project-image a:hover .img,
.project-image a:focus .img {
  background: transparent;
  filter: none;
}

.project-image a::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  transition: var(--transition);
  background-color: var(--navy);
  mix-blend-mode: screen;
}

.project-image .img {
  border-radius: var(--border-radius);
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);
}

@media (max-width: 1080px) {
  li.project:nth-of-type(odd) .project-content {
    grid-column: 5 / -1;
  }
  .project-content {
    grid-column: 1 / 9;
  }
}
@media (min-width: 768px) {
  .project-title {
    margin: 0 0 20px;
  }
}
@media (max-width: 768px) {
  li.project {
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);
  }
  li.project:hover,
  li.project:focus-visible {
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }
  li.project:not(:last-of-type) {
    margin-bottom: 70px;
  }
  li.project:nth-of-type(odd) .project-content {
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    text-align: left;
  }
  li.project:nth-of-type(odd) .project-tech-list {
    justify-content: flex-start;
  }
  li.project:nth-of-type(odd) .project-tech-list li {
    margin: 0 10px 5px 0;
  }
  li.project:nth-of-type(odd) .project-links {
    justify-content: flex-start;
    margin-left: -10px;
    margin-right: 0;
  }
  li.project:nth-of-type(odd) .project-image {
    grid-column: 1 / -1;
  }
  .project-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  }
  .project-title {
    color: var(--white);
  }
  .project-title a {
    position: static;
  }
  .project-title a::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .project-description {
    padding: 20px 0;
    background-color: transparent;
    box-shadow: none;
  }
  .project-description:hover {
    box-shadow: none;
  }
  .project-tech-list {
    margin: 10px 0;
  }
  .project-tech-list li {
    margin: 0 10px 5px 0;
    color: var(--lightest-slate);
  }
  .project-image {
    grid-column: 1 / -1;
    height: 100%;
    opacity: 0.25;
  }
  .project-image .img {
    object-fit: cover;
    width: auto;
    height: 100%;
    filter: grayscale(100%) contrast(1) brightness(50%);
  }
}

@media (max-width: 480px) {
  li.project:not(:last-of-type) {
    margin-bottom: 30px;
  }
  li.project:nth-of-type(odd) .project-content {
    padding: 25px 25px 20px;
  }
  .project-content {
    padding: 30px 25px 20px;
  }
}
</style>
