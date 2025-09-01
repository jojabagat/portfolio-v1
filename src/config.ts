export interface Links {
  name: string
  url: string
}

export const emailAd: string = 'jo.jabagat@gmail.com'

export const socialMedia: Links[] = [
  {
    name: 'GitHubSocial',
    url: 'https://github.com/jojabagat',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/jojabagat',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/jojabagat/',
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/jojabagat',
  },
]

export const navLinks: Links[] = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Experience',
    url: '/#experience',
  },
  {
    name: 'Work',
    url: '/#works',
  },
  {
    name: 'Skills',
    url: '/#skills',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
]

export const colors = {
  green: '#64ffda',
  navy: '#0a192f',
  darkNavy: '#020c1b',
}

export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: 'bottom',
  distance: '20px',
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
})

export const siteMetaData = {
  title: 'Josephine Jabagat',
  description:
    'Josephine Jabagat is a software engineer who specializes in developing software applications.',
  siteUrl: 'https://jojabagat.com',
  image: '/og.png', // Path to your image you placed in the 'static' folder
  twitterUsername: '',
}
