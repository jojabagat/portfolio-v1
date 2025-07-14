<template>
  <component :is="component" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

type IconName =
  | 'Adobe Photoshop'
  | 'Agile Scrum'
  | 'Bookmark'
  | 'C++'
  | 'CSS'
  | 'Eclipse IDE'
  | 'External'
  | 'Folder'
  | 'Fork'
  | 'Git'
  | 'GitHubSocial'
  | 'GitHub'
  | 'GitLab'
  | 'GraphQL'
  | 'HTML'
  | 'HubSpot CMS'
  | 'Java'
  | 'JavaScript'
  | 'JUnit'
  | 'Laravel'
  | 'LeetCode'
  | 'Linkedin'
  | 'Loader'
  | 'Logo'
  | 'MacOS'
  | 'Maven'
  | 'MySQL'
  | 'Node.js'
  | 'NPM'
  | 'PHP'
  | 'PostgreSQL'
  | 'Postman'
  | 'Requirements Analysis'
  | 'Rest APIs'
  | 'RDBMS'
  | 'SVN'
  | 'ServiceNow'
  | 'Star'
  | 'Technical Documentation'
  | 'TypeScript'
  | 'Unit and Integration Testing'
  | 'VSCode'
  | 'Vue.js'
  | 'Waterfall Methodology'
  | 'Windows'
  | 'YAML'
  | 'jQuery'

const props = defineProps<{
  name: IconName | string
}>()

const component = computed(() => {
  switch (props.name) {
    case 'Adobe Photoshop':
      return defineAsyncComponent(() => import('./PhotoshopIcon.vue'))
    case 'Agile Scrum':
      return defineAsyncComponent(() => import('./AgilescrumIcon.vue'))
    case 'Bookmark':
      return defineAsyncComponent(() => import('./BookmarkIcon.vue'))
    case 'C++':
      return defineAsyncComponent(() => import('./CppIcon.vue'))
    case 'CSS':
      return defineAsyncComponent(() => import('./CSSIcon.vue'))
    case 'Eclipse IDE':
      return defineAsyncComponent(() => import('./EclipseIcon.vue'))
    case 'External':
      return defineAsyncComponent(() => import('./ExternalIcon.vue'))
    case 'Folder':
      return defineAsyncComponent(() => import('./FolderIcon.vue'))
    case 'Git':
      return defineAsyncComponent(() => import('./GitIcon.vue'))
    case 'GitHubSocial':
      return defineAsyncComponent(() => import('./GithubIcon.vue'))
    case 'GitHub':
      return defineAsyncComponent(() => import('./GithubIcon1.vue'))
    case 'GitLab':
      return defineAsyncComponent(() => import('./GitlabIcon.vue'))
    case 'GraphQL':
      return defineAsyncComponent(() => import('./GraphqlIcon.vue'))
    case 'HTML':
      return defineAsyncComponent(() => import('./HTMLIcon.vue'))
    case 'HubSpot CMS':
      return defineAsyncComponent(() => import('./HubspotIcon.vue'))
    case 'Java':
      return defineAsyncComponent(() => import('./JavaIcon.vue'))
    case 'JavaScript':
      return defineAsyncComponent(() => import('./JavascriptIcon.vue'))
    case 'JUnit':
      return defineAsyncComponent(() => import('./JunitIcon.vue'))
    case 'Laravel':
      return defineAsyncComponent(() => import('./LaravelIcon.vue'))
    case 'LeetCode':
      return defineAsyncComponent(() => import('./LeetcodeIcon.vue'))
    case 'Linkedin':
      return defineAsyncComponent(() => import('./LinkedinIcon.vue'))
    case 'Loader':
      return defineAsyncComponent(() => import('./LoaderIcon.vue'))
    case 'Logo':
      return defineAsyncComponent(() => import('./LogoIcon.vue'))
    case 'MacOS':
      return defineAsyncComponent(() => import('./MacosIcon.vue'))
    case 'Maven':
      return defineAsyncComponent(() => import('./MavenIcon.vue'))
    case 'MySQL':
      return defineAsyncComponent(() => import('./MysqlIcon.vue'))
    case 'Node.js':
      return defineAsyncComponent(() => import('./NodejsIcon.vue'))
    case 'NPM':
      return defineAsyncComponent(() => import('./NpmIcon.vue'))
    case 'PHP':
      return defineAsyncComponent(() => import('./PHPIcon.vue'))
    case 'PostgreSQL':
      return defineAsyncComponent(() => import('./PostgresqlIcon.vue'))
    case 'Postman':
      return defineAsyncComponent(() => import('./PostmanIcon.vue'))
    case 'Requirements Analysis':
      return defineAsyncComponent(() => import('./ReqanalysisIcon.vue'))
    case 'Rest APIs':
      return defineAsyncComponent(() => import('./RestapiIcon.vue'))
    case 'RDBMS':
      return defineAsyncComponent(() => import('./RdbmsIcon.vue'))
    case 'SVN':
      return defineAsyncComponent(() => import('./SvnIcon.vue'))
    case 'ServiceNow':
      return defineAsyncComponent(() => import('./ServicenowIcon.vue'))
    case 'Star':
      return defineAsyncComponent(() => import('./StarIcon.vue'))
    case 'Technical Documentation':
      return defineAsyncComponent(() => import('./TechnicaldocIcon.vue'))
    case 'TypeScript':
      return defineAsyncComponent(() => import('./TypescriptIcon.vue'))
    case 'Unit and Integration Testing':
      return defineAsyncComponent(() => import('./TestingIcon.vue'))
    case 'VSCode':
      return defineAsyncComponent(() => import('./VscodeIcon.vue'))
    case 'Vue.js':
      return defineAsyncComponent(() => import('./VuejsIcon.vue'))
    case 'Waterfall Methodology':
      return defineAsyncComponent(() => import('./WaterfallIcon.vue'))
    case 'Windows':
      return defineAsyncComponent(() => import('./WindowsIcon.vue'))
    case 'YAML':
      return defineAsyncComponent(() => import('./YamlIcon.vue'))
    case 'jQuery':
      return defineAsyncComponent(() => import('./JqueryIcon.vue'))
    default:
      console.warn(`Icon "${props.name}" not found`)
      return null
  }
})
</script>
