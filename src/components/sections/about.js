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

  const skills = ['Languages: Python, C, C++, MATLAB', 'Libraries and Tools: OpenCV, ROS, MATLAB, TensorFlow, PyTorch, Git, Arduino, bash, CUDA, gtest, Qt, Fusion 360, Solidworks, Ultimaker Cura', 'Development Platforms: Linux (Ubuntu), Embedded robotics, Gazebo, AirSim, CARLA, CarSim, MoveIt'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
        <div>
          <p>
            Hello! <span role="img" aria-label="waving hand">👋</span> I'm <strong>Mayank</strong>, a <strong>Master's student in Robotics</strong> at the <strong>University of Maryland, College Park</strong>.
          </p>

          <p>
            Throughout my journey, I've had the opportunity to work as a <strong>Robotics Software Engineer at Codelattice Labs</strong>, where I enhanced multi-agent path planning and optimized navigation systems for delivery robots. At the <strong>GAMMA AI Lab</strong>, I developed a novel deep learning architecture that improved autonomous navigation in crowded environments. Currently, as a <strong>Co-op at Intuitive Surgical</strong>, I'm working on implementing Optical Flow solutions to verify and ensure intuitive driving for clinician during surgical procedures.
          </p>

          <p>
              When I'm not immersed in robotics, I enjoy <strong>playing football</strong>, <strong>catching movies</strong>, and <strong>gaming with friends</strong>. My recent internship in California ignited a passion for <strong>hiking</strong>, and I love embarking on quick hikes whenever I get the chance. I'm also an avid reader of <strong>Finance books</strong> and could spend hours discussing <strong>investment strategies</strong>, <strong>personal finance</strong>, the <strong>stock market</strong>, and <strong>global economics</strong>.
          </p>

          <p>
            I'm passionate about contributing to technologies that <strong>shape the future</strong> and <strong>enhance lives</strong> through innovative robotics solutions.
          </p>
        </div>


          {/* <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul> */}
          <ul className="skills-list">
            <li><strong style={{color: 'var(--green)'}}>Languages:</strong> Python, C, C++, MATLAB</li>
            <li><strong style={{color: 'var(--green)'}}>Libraries/Frameworks:</strong> OpenCV, ROS, TensorFlow, PyTorch, Arduino, CUDA, gtest</li>
            <li><strong style={{color: 'var(--green)'}}>Development Platforms:</strong> Linux, Embedded robotics, Gazebo, AirSim, CARLA, CarSim, MoveIt</li>
            <li><strong style={{color: 'var(--green)'}}>Design:</strong> Adobe Photoshop,Qt, Fusion 360, Solidworks, Ultimaker Cura, Figma</li>
            <li><strong style={{color: 'var(--green)'}}>Tools:</strong> Kubernetes, Docker, Git, Confluence, bash, GitHub Actions, GPU Programming</li>
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/ups-shot.jpg" //either me.jpg or ups-shot.jpg
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
