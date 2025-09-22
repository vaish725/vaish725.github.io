/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    
    type Frontmatter {
      title: String
      date: Date @dateformat
      cover: File @fileByRelativePath
      tech: [String]
      github: String
      external: String
      description: String
      slug: String
      tags: [String]
      draft: Boolean
      company: String
      showInProjects: Boolean
    }
  `;
  
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const blogTagTemplate = path.resolve('src/templates/blog-tag.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/content/posts/" }
          frontmatter: { slug: { ne: null } }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/content/posts/" }
          frontmatter: { tags: { ne: null } }
        }
        limit: 2000
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages for pensieve section
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    // Create regular pensieve posts
    if (node.frontmatter.slug.includes('/pensieve/')) {
      createPage({
        path: node.frontmatter.slug,
        component: postTemplate,
        context: {},
      });
    } else {
      // Create blog posts
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {},
      });
    }
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;

  // Create regular pensieve tag pages
  tags.forEach(tag => {
    createPage({
      path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });

    // Create blog tag pages
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: blogTagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
