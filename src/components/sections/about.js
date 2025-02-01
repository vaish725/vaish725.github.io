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
              Hello! <span role="img" aria-label="waving hand">👋</span> I'm <strong>Mayank</strong>, a dedicated <strong>Master's student in Robotics</strong> at the <strong>University of Maryland, College Park</strong>.
            </p>

            <p>
            My fascination with robotics began early on, driving me to explore and innovate in this dynamic field. I recently completed a <strong>Co-op at Intuitive Surgical</strong>, where I developed Optical Flow solutions to enhance robot intuitiveness for clinicians during surgical procedures. Previously, as a <strong>Robotics Software Engineer at Codelattice Labs</strong>, I optimized multi-agent path planning and navigation systems for delivery robots. At the <strong>GAMMA AI Lab</strong>, I designed a novel deep learning architecture that significantly advanced autonomous navigation in crowded environments.
            </p>

            <p>
              Outside of robotics, I stay active by <strong>playing football</strong> and <strong>hiking</strong>. I'm passionate about <strong>finance</strong>, delving into <strong>investment strategies</strong> and exploring the <strong>stock market</strong> and <strong>global economics</strong>. I also enjoy unwinding with a good movie or gaming with friends.
            </p>

            <p>
              <strong>Technologies I’ve been working with recently:</strong>
            </p>
          </div>





          {/* <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul> */}
          <ul className="skills-list">
            <li><strong style={{color: 'var(--green)'}}>Languages:</strong> C++, Python, C, MATLAB</li>
            <li><strong style={{color: 'var(--green)'}}>Development Platforms:</strong> Linux/RTOS environments, Embedded robotics, Gazebo, AirSim, CARLA, CarSim, MoveIt, SUMO</li>
            <li><strong style={{color: 'var(--green)'}}>Libraries/Frameworks:</strong> ROS/ROS2, PyTorch, JAX, OpenCV, TensorFlow, Arduino, gtest, Qt, SolidWorks</li>
            <li><strong style={{color: 'var(--green)'}}>Embedded & Architecture:</strong> ARM platforms, CUDA, TensorRT, RTOS, controllers, interrupts, buses</li>
            <li><strong style={{color: 'var(--green)'}}>Tools:</strong> Kubernetes, Docker, Git, Confluence, bash, GitHub Actions, GPU Programming</li>
          </ul>
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
