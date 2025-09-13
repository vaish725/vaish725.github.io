import React from 'react';
import { graphql } from 'gatsby';
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

  .post__company {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin: 5px 0;
    font-weight: 500;
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

const LeadershipPage = ({ location, data }) => {
  const positions = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <Helmet title="Leadership Experience" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Leadership Experience</h1>
          <p className="subtitle">Leadership roles and positions I've held</p>
        </header>

        <StyledPostList>
          {positions.length > 0 &&
            positions.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, date, tech, company } = frontmatter;
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
                          <h2 className="post__title">{title}</h2>
                          {company && <p className="post__company">{company}</p>}
                          <span className="post__date">{formattedDate}</span>
                        </div>
                      </div>
                      <div className="post__desc" dangerouslySetInnerHTML={{ __html: html }} />
                    </header>

                    <div className="post__footer">
                      <ul className="post__tags">
                        {tech && tech.map((skill, i) => <li key={i}>{skill}</li>)}
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

LeadershipPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LeadershipPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/leadership/" }
        frontmatter: { showInProjects: { eq: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tech
            company
          }
          html
        }
      }
    }
  }
`;
