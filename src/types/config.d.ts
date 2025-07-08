declare module '@/config' {
  export function srConfig(delay?: number, viewFactor?: number): SrConfig
  export const emailAd: string
  export const socialMedia: Links[]
  export const navLinks
  export const siteMetaData
  export const colors
}
