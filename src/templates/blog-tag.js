import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconBookmark } from '@components/icons';

const StyledTagContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;

  & > header {
    margin-bottom: 50px;
    text-align: center;
  }
`;

const StyledPostList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  margin-top: 50px;
  position: relative;
`;

const StyledPost = styled.li`
  transition: var(--transition);
  cursor: default;
  margin-bottom: 30px;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .post__inner {
        transform: translateY(-5px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .post__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2.5rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    background-color: var(--light-navy);

    header {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .header-top {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
    }
  }

  .post__icon {
    ${({ theme }) => theme.mixins.flexCenter};
    color: var(--green);
    margin-right: 20px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .post__title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .post__desc {
    color: var(--light-slate);
    font-size: 18px;
    margin-bottom: 20px;
  }

  .post__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }

  .post__date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }
`;

const StyledBackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 40px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  &:before {
    content: '←';
    margin-right: 5px;
  }
`;

const BlogTagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.edges;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;

  return (
    <Layout location={location}>
      <Helmet title={`#${tag} | Blog`} />

      <StyledTagContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blog">All blog posts</Link>
        </span>

        <header>
          <h1 className="medium-heading">#{tag}</h1>
          <p className="subtitle">{tagHeader}</p>
        </header>

        <StyledPostList>
          {posts.map(({ node }) => {
            const { slug, title, date, description } = node.frontmatter;
            const formattedDate = new Date(date).toLocaleDateString();

            return (
              <StyledPost key={slug}>
                <div className="post__inner">
                  <header>
                    <div className="header-top">
                      <div className="post__icon">
                        <IconBookmark />
                      </div>
                      <div>
                        <h2 className="post__title">
                          <Link to={slug}>{title}</Link>
                        </h2>
                        <span className="post__date">{formattedDate}</span>
                      </div>
                    </div>
                    <p className="post__desc">{description}</p>
                  </header>

                  <div className="post__footer">
                    <Link to={`/blog/tags/${kebabCase(tag)}/`} className="inline-link">
                      #{tag}
                    </Link>
                  </div>
                </div>
              </StyledPost>
            );
          })}
        </StyledPostList>
      </StyledTagContainer>
    </Layout>
  );
};

BlogTagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              slug: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }),
  location: PropTypes.object,
};

export default BlogTagTemplate;

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, draft: { ne: true } }
        fileAbsolutePath: { regex: "/content/posts/" }
      }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
          }
        }
      }
    }
  }
`;
