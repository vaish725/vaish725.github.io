module.exports = {
  siteTitle: 'Vaishnavi Kamdi',
  siteDescription:
    'Vaishnavi Kamdi is a software engineer specializing in Machine Learning, MLOps, and full-stack development.',
  siteUrl: 'https://vaishnavik.me',
  siteLanguage: 'en_US',
  ogImage: '/og.png',
  name: 'Vaishnavi Kamdi',
  location: 'Washington D.C',
  email: 'v.kamdi@gwu.edu',
  github: 'https://github.com/vaish725',
  twitterHandle: '@vaishnavik',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/vaish725',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/vaishnavi-kamdi/',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vaishkx725/',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Work Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Publications',
      url: '/#publications',
    },
    {
      name: 'Leadership',
      url: '/leadership',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200) => ({
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
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
