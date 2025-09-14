module.exports = {
  name: 'Vaishnavi Kamdi',
  siteTitle: 'Vaishnavi Kamdi',
  siteDescription: 'Vaishnavi Kamdi is a software engineer specializing in Machine Learning, MLOps, and full-stack development.',
  siteUrl: 'https://vaishnavik.me',
  ogImage: '/og.png',
  twitterHandle: '@vaishnavik',
  
  email: 'v.kamdi@gwu.edu',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/vaish725',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vaishkx725/',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/vaishnavi-kamdi/',
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
      name: 'Leadership Experience',
      url: '/leadership',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
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
  }),
};
