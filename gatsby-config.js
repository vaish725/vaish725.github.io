const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    image: config.ogImage,
    twitterUsername: config.twitterHandle,
    author: config.name,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        start_url: `/`,
        background_color: `#0a192f`,
        theme_color: `#0a192f`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
};
