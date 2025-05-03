// VISITED BUT PLAY AROUND WITH THIS
import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  text-align: justify; // Add this line to justify the text content

  ul.skills-list {
    display: grid;
    // grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-template-columns: 1fr; // Use a single column for all items
    // grid-gap: 0 10px; // Lynn does not have this
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '❖';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      // background: transparent;
      // outline: 0;

      // &:after {
      //   top: 15px;
      //   left: 15px;
      // }

      // Lynn used above hover settings

      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      // mix-blend-mode: multiply; // Adds bluish tint to the picture
      // filter: grayscale(100%) contrast(1); // Makes image grayscale pre-hover
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['Languages: Python, C, C++, MATLAB', 'Libraries and Tools: OpenCV, ROS, MATLAB, TensorFlow, PyTorch, Git, Arduino, bash, CUDA, gtest, Qt, Fusion 360, Solidworks, Ultimaker Cura', 'Development Platforms: Linux (Ubuntu), Embedded robotics, Gazebo, AirSim, CARLA, CarSim, SUMO, MoveIt'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
          <p>
            I absolutely love talking <strong>Football, Finance, and Startups</strong>—and honestly, I think the life would’ve been way more exciting if I was already working in one of these <em>(but hey, I'm getting there!)</em>.
          </p>

          <p>
            Something else I find really cool? <strong>Robots</strong>. I recently wrapped up my <strong>Master's degree in Robotics</strong>, where I spent countless hours diving into Controls, Perception, and way too much C++. But after taking a course on <strong>Multimodal Foundation Models</strong>, I got completely hooked and couldn't stop exploring them. Now, I've fully committed to diving deep into <strong>Multimodal Agentic AI</strong>. One thing I've realized along the way: it's incredibly valuable to master one area deeply before branching out—being able to claim mastery over a domain has so much cross-applicability <em>(Thank You, Kyle!)</em>
          </p>

          <p>
            I’m excited for all the great conversations and adventures ahead as I keep exploring this fascinating journey!
          </p>

            {/* <p>
              <strong>Technologies I’ve been working with recently:</strong>
            </p> */}
          </div>





          {/* <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul> */}
          {/* <ul className="skills-list">
            <li><strong style={{color: 'var(--green)'}}>Programming Languages:</strong> Python, C++, C</li>
            <li><strong style={{color: 'var(--green)'}}>AI/ML Libraries & Frameworks:</strong> PyTorch, OpenCV, Pandas, NumPy</li>
            <li><strong style={{color: 'var(--green)'}}>Core AI/ML:</strong> Deep Learning (Transformers, CNNs, RNNs), Computer Vision, Reinforcement Learning, Model Evaluation & Validation, Multimodal Finetuning & Post-Training</li>
            <li><strong style={{color: 'var(--green)'}}>Hardware Acceleration & Optimization:</strong> CUDA, TensorRT</li>
            <li><strong style={{color: 'var(--green)'}}>MLOps, Platforms & Tools:</strong> Docker, Kubernetes, Git, GitHub Actions (CI/CD), Linux, Bash Scripting, AWS/GCP, Jira/Confluence</li>
            <li><strong style={{color: 'var(--green)'}}>Testing:</strong> GoogleTest (gtest)</li>
          </ul> */}
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/cali_zoomed.jpeg" //either me.jpg or ups-shot.jpg
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
