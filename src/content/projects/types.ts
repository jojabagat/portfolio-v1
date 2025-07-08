export interface ProjectItem {
  frontmatter: {
    title: string
    cover: {
      childImageSharp: {
        gatsbyImageData: string
      }
    }
    tech: string[]
    external: string
  }
  html: string
}
