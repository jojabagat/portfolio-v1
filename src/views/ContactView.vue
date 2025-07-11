<script setup lang="ts">
import { usePrefersReducedMotion } from '@/composables/UsePrefersReducedMotion'
import { emailAd, srConfig } from '@/config'
import { navDelay } from '@/utils/constants'
import sr from '@/utils/sr'
import { nextTick, onMounted, ref } from 'vue'

const revealContainer = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

const mailToLink = `mailto:${emailAd}`

onMounted(async () => {
  if (prefersReducedMotion.value) return

  await nextTick()

  setTimeout(() => {
    if (sr && revealContainer.value) {
      sr.reveal(revealContainer.value, srConfig())
    }
  }, navDelay) // Slight delay prevents scroll-jump
})
</script>

<template>
  <section class="contact" id="contact" ref="revealContainer">
    <h2 class="numbered-heading overline">What’s Next?</h2>

    <h2 class="title">Get In Touch</h2>

    <p>
      I'm currently looking for new opportunities to venture on. Whether you have a question or just
      want to say hi, I’ll try my best to get back to you!
    </p>

    <a class="email-link bigButton" :href="mailToLink" target="_blank" rel="noopener noreferrer">
      Say Hello
    </a>
  </section>
</template>

<style>
.contact {
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;
}

.contact .overline {
  display: block;
  margin-bottom: 20px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  font-weight: 400;
}
.contact .overline::before {
  bottom: 0;
  font-size: var(--fz-sm);
}

.contact .overline::after {
  display: none;
}

.contact .title {
  font-size: clamp(40px, 5vw, 60px);
}

.email-link {
  margin-top: 50px;
}

@media (max-width: 768px) {
  .contact {
    margin: 0 auto 50px;
  }
}
</style>
