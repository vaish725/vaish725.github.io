import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledPostHeader = styled.header`
  margin-bottom: 50px;

  h1 {
    margin-bottom: 10px;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
  }

  .post-meta {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 30px;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    a {
      display: inline-block;
      background-color: var(--light-navy);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      padding: 4px 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 3px;
      transition: var(--transition);

      &:hover,
      &:focus {
        background-color: var(--green-tint);
      }
    }
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    color: var(--lightest-slate);
  }

  h2 {
    font-size: 28px;
    border-bottom: 1px solid var(--lightest-navy);
    padding-bottom: 0.3em;
  }

  h3 {
    font-size: 24px;
  }

  p,
  ul,
  ol {
    margin: 1em 0;
    line-height: 1.8;
    color: var(--light-slate);
    font-size: 18px;
  }

  ul,
  ol {
    padding-left: 2em;

    li {
      margin-bottom: 0.5em;
    }
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  blockquote {
    border-left: 3px solid var(--green);
    margin-left: 0;
    padding-left: 20px;
    font-style: italic;
    color: var(--slate);
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-family: var(--font-mono);
    font-size: 16px;
    padding: 0.2em 0.4em;
  }

  pre {
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  img {
    max-width: 100%;
    display: block;
    margin: 2em auto;
    border-radius: 4px;
  }
`;

const StyledBackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 30px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  &:before {
    content: '←';
    margin-right: 5px;
  }
`;

const BlogPostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blog">All blog posts</Link>
        </span>

        <StyledPostHeader>
          <h1>{title}</h1>
          <div className="post-meta">{formattedDate}</div>

          {tags && tags.length > 0 && (
            <div className="tag-container">
              {tags.map((tag, i) => (
                <Link key={i} to={`/blog/tags/${kebabCase(tag)}/`}>
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledPostContainer>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
