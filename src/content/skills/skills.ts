export interface SkillItem {
  category: string
  tools: string[]
}

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
    tools: ['MySQL', 'PostgreSQL', 'RDBMS', 'Maven', 'GraphQL'],
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
    tools: ['HubSpot CMS', 'ServiceNow', 'Adobe Photoshop', 'YAML'],
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
