import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconBookmark } from '@components/icons';

const StyledMainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  
  & > header {
    margin-bottom: 60px;
    text-align: center;
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
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
    justify-content: space-between;
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

  ul.post__tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const StyledTagsSection = styled.div`
  margin-bottom: 30px;
  
  h2 {
    font-size: var(--fz-lg);
    margin-bottom: 15px;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
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
      &:focus,
      &.active {
        background-color: var(--green-tint);
      }
      
      &.view-all {
        margin-left: 10px;
        background-color: transparent;
        border: 1px solid var(--green);
      }
    }
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const tags = data.tagsGroup.group;

  return (
    <Layout location={location}>
      <Helmet title="Blog" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Blog</h1>
          <p className="subtitle">
            Thoughts, ideas, and technical explorations
          </p>
        </header>
        
        <StyledTagsSection>
          <h2>Browse by Tag</h2>
          <div className="tag-list">
            <Link to="/blog">All</Link>
            {tags.slice(0, 10).map(tag => (
              <Link key={tag.fieldValue} to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            ))}
            {tags.length > 10 && (
              <Link to="/blog-tags" className="view-all">View all tags...</Link>
            )}
          </div>
        </StyledTagsSection>

        <StyledPostList>
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, slug, date, tags } = frontmatter;
              const formattedDate = new Date(date).toLocaleDateString();

              return (
                <StyledPost key={i}>
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
                      <ul className="post__tags">
                        {tags && tags.map((tag, i) => (
                          <li key={i}>
                            <Link to={`/blog/tags/${kebabCase(tag)}/`} className="inline-link">
                              #{tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StyledPost>
              );
            })}
        </StyledPostList>
      </StyledMainContainer>
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
          }
          html
        }
      }
    }
    tagsGroup: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" }, frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`; 