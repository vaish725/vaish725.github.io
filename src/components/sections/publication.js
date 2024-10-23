// src/components/Publications.js

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
// Removed unused imports
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// Styled Components for Publications Section
const StyledPublicationsSection = styled.section`
  max-width: 950px;
  margin: 0 auto 50px;
  padding: 0 20px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 40px;
  }

  .publications-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .publication-item {
      margin-bottom: 40px;
      text-align: justify;

      &:last-of-type {
        margin-bottom: 0;
      }

      .publication-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 10px;

        @media (min-width: 600px) {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .publication-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 5px;

          a {
            color: var(--lightest-slate);
            text-decoration: none;

            &:hover,
            &:focus {
              text-decoration: underline;
            }
          }
        }

        .publication-meta {
          font-size: var(--fz-sm);
          color: var(--light-slate);
        }
      }

      .publication-description {
        font-size: var(--fz-md);
        color: var(--slate);
      }
    }
  }
`;

// Publications Component
const Publications = () => {
  const revealContainer = useRef(null);
  const revealTitle = useRef(null);
  const revealPublications = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // List of Publications
  const publications = [
    {
      title: 'Behavioral Analysis of ROS motion planners integrated with Robotics Middleware Framework (RMF)',
      link: 'https://ieeexplore.ieee.org/document/9989028',
      year: '2022',
      publisher: 'IEEE',
      description:
        'This paper evaluates the integration of the Robotics Middleware Framework (RMF) with Free Fleet, analyzing the performance of different path planning algorithms in multi-robot scenarios to enhance autonomous mobile robot fleet management.',
    },
    // Add more publications here as needed
    // {
    //   title: 'Advanced Path Planning Techniques for Autonomous Robots in Dynamic Environments',
    //   link: 'https://ieeexplore.ieee.org/document/1234567',
    //   year: '2023',
    //   publisher: 'ACM',
    //   description:
    //     'Introduced novel path planning algorithms that enhance the adaptability of autonomous robots in environments with dynamic obstacles, significantly improving navigation efficiency.',
    // },
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Reveal the entire container if needed
    sr.reveal(revealContainer.current, srConfig());

    // Reveal the title
    sr.reveal(revealTitle.current, srConfig());

    // Reveal each publication item with a staggered delay
    revealPublications.current.forEach((ref, i) => {
      sr.reveal(ref, srConfig(i * 100));
    });
  }, [prefersReducedMotion]);

  return (
    <StyledPublicationsSection id="publications" ref={revealContainer}>
      <h2 className="numbered-heading" ref={revealTitle}>
        Publications
      </h2>

      <ul className="publications-list">
        {publications.map((pub, index) => (
          <li
            className="publication-item"
            key={index}
            ref={(el) => (revealPublications.current[index] = el)}
          >
            <div className="publication-header">
              <div className="publication-title">
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.title}
                </a>
              </div>
              <div className="publication-meta">
                {pub.year} | {' '}
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.publisher}
                </a>
              </div>
            </div>
            <p className="publication-description">{pub.description}</p>
          </li>
        ))}
      </ul>
    </StyledPublicationsSection>
  );
};

export default Publications;
