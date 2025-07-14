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
    html: '<ul class="fancyList"><li>Estimated effort requirements for design, source code, and testing.</li><li>Modified existing source codes according to client\'s requirements.</li><li>Handled non-routine tasks for existing software, including code reviews, feature research, and implementing improvements.</li><li>Updates and maintains software according to specifications and documentation.</li><li>Engaged in independent study on vue.js and TypeScript inpreparation for an upcoming project with hands-on output.</li></ul>',
  },
  {
    frontmatter: {
      title: 'Software Design Engineer 1 & 2',
      company: 'NEC Telecom Software Phils, Inc.',
      range: '2019 – 2021',
      url: 'https://devhouse.io',
    },
    html: '<ul class="fancyList"><li>Hands-on experience across all phases of software development.</li><li>Estimated effort requirements for design, source code, and testing.</li><li>Created and developed detailed designs based on requirements analysis.</li><li>Created and performed unit and integration tests.</li><li>Performed peer-review for design documents, source codes, and test specifications.</li><li>Utilized various development and testing tools such as VSCode, Eclipse, Ranorex, JUnit.</li><li>Experienced working in both Agile and Waterfall methodologies.</li><li>Spent time in Japan working closely with the client to clarify questions and make sure we were aligned on the project’s goals and requirements.</li></ul>',
  },
  {
    frontmatter: {
      title: 'Web Developer',
      company: 'Ancile, Inc.',
      range: '2018',
      url: 'https://devhouse.io',
    },
    html: '<ul class="fancyList"><li>Developed and maintained websites for clients according to their needs and desired design using HubSpot CMS.</li><li>Created PSD files for website design proposals.</li></ul>',
  },
]
