<template><div></div></template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { siteMetaData } from '@/config'

// Props
const props = defineProps<{
  title?: string
  description?: string
  image?: string
}>()

// Access route for current path
const route = useRoute()

// Compute SEO values
const seo = {
  title: props.title || siteMetaData.title,
  description: props.description || siteMetaData.description,
  image: siteMetaData.siteUrl + (props.image || siteMetaData.image),
  url: siteMetaData.siteUrl + route.fullPath,
}

// Set meta tags
useHead({
  title: seo.title,
  titleTemplate: (chunk) => `${chunk} | ${siteMetaData.title}`,
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { name: 'description', content: seo.description },
    { name: 'image', content: seo.image },

    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:image', content: seo.image },
    { property: 'og:url', content: seo.url },
    { property: 'og:type', content: 'website' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: siteMetaData.twitterUsername },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description },
    { name: 'twitter:image', content: seo.image },

    { name: 'google-site-verification', content: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk' },
  ],
})
</script>
