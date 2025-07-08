export interface SkillItem {
  category: string
  tools: string[]
}

// export const skillList: SkillItem[] = [
//   {
//     category: 'Languages',
//     tools: ['PHP', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'C++'],
//   },
//   {
//     category: 'Frameworks',
//     tools: ['Laravel', 'Vue.js', 'Node.js', 'jQuery', 'JUnit'],
//   },
//   {
//     category: 'Databases',
//     tools: ['MySQL', 'PostgreSQL', 'RDBMS'],
//   },
//   {
//     category: 'APIs & Testing',
//     tools: ['Rest APIs', 'Postman', 'Unit and Integration Testing', 'JUnit'],
//   },
//   {
//     category: 'Version Control',
//     tools: ['Git', 'SVN'],
//   },
//   {
//     category: 'Development Tools / IDEs',
//     tools: ['Eclipse IDE', 'VSCode', 'Maven'],
//   },
//   {
//     category: 'CMS / Design Tools',
//     tools: ['HubSpot CMS', 'ServiceNow', 'Adobe Photoshop'],
//   },
//   {
//     category: 'Operating Systems',
//     tools: ['Windows', 'MacOS'],
//   },
//   {
//     category: 'Workflow / Productivity',
//     tools: [
//       'Technical Documentation',
//       'Postman',
//       'Requirements Analysis',
//       'Agile Scrum',
//       'Waterfall Methodology',
//     ],
//   },
// ]

export const skillList: SkillItem[] = [
  {
    category: 'Languages & Frameworks',
    tools: [
      'PHP',
      'Java',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'C++',
      'Laravel',
      'Vue.js',
      'Node.js',
      'jQuery',
      'JUnit',
    ],
  },
  {
    category: 'Databases & Backend',
    tools: ['MySQL', 'PostgreSQL', 'RDBMS', 'Maven'],
  },
  {
    category: 'Tools & IDEs',
    tools: ['Eclipse IDE', 'VSCode', 'Postman', 'NPM'],
  },
  {
    category: 'Testing & APIs',
    tools: ['Rest APIs', 'Postman', 'Unit and Integration Testing', 'JUnit'],
  },
  {
    category: 'Version Control',
    tools: ['Git', 'GitHub', 'GitLab', 'SVN'],
  },
  {
    category: 'Design & CMS',
    tools: ['HubSpot CMS', 'ServiceNow', 'Adobe Photoshop'],
  },
  {
    category: 'Workflow & Methodologies',
    tools: [
      'Technical Documentation',
      'Requirements Analysis',
      'Agile Scrum',
      'Waterfall Methodology',
      'Windows',
      'MacOS',
    ],
  },
]
