export interface Experience {
  frontmatter: {
    title: string
    company: string
    range: string
    url: string
  }
  html: string
}

export const experiences: Experience[] = [
  {
    frontmatter: {
      title: 'Application Systems Engineer-Consultant',
      company: 'WeServ Systems International, Inc.',
      range: '2021 – 2025',
      url: 'https://example.com',
    },
    html: '<ul class="fancyList"><li>Developed enterprise solutions with Vue.js and TypeScript, enhancing responsiveness and scalability.</li><li>Estimated development efforts and delivered technical enhancements aligned with Agile sprint goals.</li><li>Conducted code reviews, maintained secure version control practices, and contributed to documentation.</li><li>Proactively studied Vue.js to meet evolving client tech stacks.</li></ul>',
  },
  {
    frontmatter: {
      title: 'Software Design Engineer 1 & 2',
      company: 'NEC Telecom Software Phils, Inc.',
      range: '2019 – 2021',
      url: 'https://devhouse.io',
    },
    html: '<ul class="fancyList"><li>Completed full-stack development tasks, from requirements to deployment, using Java, TypeScript, PostgreSQL, and internal tools.</li><li>Performed code and design reviews, ensuring clean architecture and unit test coverage.</li><li>Participated in both Agile and Waterfall projects; collaborated with Japanese clients for on-site requirements gathering.</li><li>Engaged in self-learning of tools to meet with client demands.</li></ul>',
  },
  {
    frontmatter: {
      title: 'Web Developer',
      company: 'Ancile, Inc.',
      range: '2018',
      url: 'https://devhouse.io',
    },
    html: '<ul class="fancyList"><li>Built responsive websites using HubSpot CMS, integrated APIs, and conducted pre-launch QA.</li><li>Created high-fidelity design proposals using Adobe Photoshop</li></ul>',
  },
]
