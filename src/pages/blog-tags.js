import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledTagsContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;

  header {
    margin-bottom: 50px;
    text-align: center;
  }
`;

const StyledTagsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  position: relative;
  margin: 50px 0;
`;

const StyledTag = styled.li`
  a {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    height: 100%;
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    transition: var(--transition);

    &:hover,
    &:focus {
      transform: translateY(-5px);
      background-color: var(--light-navy);
    }
  }

  h3 {
    margin: 0 0 10px;
    color: var(--green);
    font-size: var(--fz-lg);

    &:before {
      content: '#';
      margin-right: 2px;
    }
  }

  .tag-count {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const BlogTagsPage = ({ data, location }) => {
  const { group } = data.allMarkdownRemark;

  return (
    <Layout location={location}>
      <Helmet title="Blog Tags" />

      <StyledTagsContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blog">All blog posts</Link>
        </span>

        <header>
          <h1 className="big-heading">Tags</h1>
        </header>

        <StyledTagsGrid>
          {group.map(tag => (
            <StyledTag key={tag.fieldValue}>
              <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                <h3>{tag.fieldValue}</h3>
                <span className="tag-count">
                  {tag.totalCount} post{tag.totalCount === 1 ? '' : 's'}
                </span>
              </Link>
            </StyledTag>
          ))}
        </StyledTagsGrid>
      </StyledTagsContainer>
    </Layout>
  );
};

BlogTagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
  }),
  location: PropTypes.object,
};

export default BlogTagsPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { draft: { ne: true } }
      }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
