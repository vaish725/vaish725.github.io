import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    font-size: clamp(30px, 7vw, 70px);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 570px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mayank Deshpande.</h2>;
  const three = <h3 className="big-heading">I am a Robotics Software Engineer.</h3>;
  const four = (
    <>
      <p>
        I’m a <strong>Robotics Software Engineer</strong> specializing in specializing in <strong>Perception and Planning</strong> for Robots.
      </p>

      <p>
        My expertise spans <strong>Computer Vision</strong>, <strong>Robot Perception</strong>, <strong>Reinforcement Learning</strong>, and <strong>Multimodal AI</strong>.
      </p>

      <p>
        Currently, looking for full-time roles in robotics and computer vision starting June 2025.
        Do{' '}
        <a href="#contact">
          Reach Out 
        </a>
        {' '}if you think I'd make a good fit for your organization!
      </p>
    </>
  );
  const five = (
    <a href="/resume.pdf" className="email-link" target="_blank" rel="noopener noreferrer">
      My Resume
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
