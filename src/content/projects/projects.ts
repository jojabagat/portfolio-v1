import type { ProjectItem } from './types'
import buckeye from '@/images/works/buckeye.png'
import agtivation from '@/images/works/agtivation.png'
import dinapolis from '@/images/works/dinapolis.png'
import portfolio from '@/images/works/portfolio.png'

export const projects: ProjectItem[] = [
  {
    frontmatter: {
      title: 'Buckeye Farmers',
      cover: {
        childImageSharp: {
          gatsbyImageData: buckeye,
        },
      },
      tech: ['HubSpot', 'GraphQL', 'YAML'],
      external: 'https://www.buckeyefarmers.com/',
    },
    html: '<p>Developed a website based on PSD designs approved by our Australian clients, utilizing HubSpot as the development platform..</p>',
  },
  {
    frontmatter: {
      title: 'Agtivation LTD',
      cover: {
        childImageSharp: {
          gatsbyImageData: agtivation,
        },
      },
      tech: ['HubSpot', 'GraphQL', 'YAML'],
      external: 'https://www.agtivation.com/',
    },
    html: '<p>Enhanced an ongoing website project by integrating additional content and functionality through HubSpot.</p>',
  },
  {
    frontmatter: {
      title: "Dinapoli's Firehouse",
      cover: {
        childImageSharp: {
          gatsbyImageData: dinapolis,
        },
      },
      tech: ['PHP Laravel', 'Apache', 'MySQL'],
      external: 'https://dinapolisfirehouse.com/',
    },
    html: '<p>Maintained and enhanced the existing website by implementing client-requested feature additions and modifications.</p>',
  },
  {
    frontmatter: {
      title: 'Personal Portfolio',
      cover: {
        childImageSharp: {
          gatsbyImageData: portfolio,
        },
      },
      tech: ['Vue.js', 'TypeScript'],
      external: 'https://jojabagat.vercel.app/',
    },
    html: '<p>Developed my own personal website based on the <a href="https://v4.brittanychiang.com/" target="_blank">React.js project of Brittany Chiang</a> by converting it to a Vue.js + TypeScript project.</p>',
  },
]
