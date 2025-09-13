// VISITED BUT PLAY AROUND WITH THIS
import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Helmet } from 'react-helmet';

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
      object-fit: cover;
      object-position: 60% center;
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

  const skills = [
    'Languages: Python, C/C++, Java, nodeJS, Swift, SQL, JavaScript, HTML/CSS',
    'Libraries/Frameworks: TensorFlow, PyTorch, PySpark, A/B Testing, OpenCV, FastAPI, React Native, pandas, NumPy, Scikit-learn, Streamlit',
    'Tools & Technologies:AWS, GCP, Docker, Git, Linux, MongoDB, PostgreSQL, Tableau',
    'Areas of Expertise: Software Development, Machine Learning, Deep Learning, Data Mining, Cloud Computing',
  ];

  return (
    <StyledAboutSection
      id="about"
      ref={revealContainer}
      itemScope
      itemType="https://schema.org/Person">
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mayank Deshpande",
              "jobTitle": "Robotics Software Engineer",
              "description": "Robotics Software Engineer with expertise in Computer Vision, Perception and AI",
              "knowsAbout": ["Robotics", "Computer Vision", "AI", "Perception", "Multimodal Foundation Models", "Agentic AI"],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Master's degree in Computer Science"
              },
              "skills": ["Python", "C++", "C", "OpenCV", "ROS", "TensorFlow", "PyTorch", "CUDA"]
            }
          `}
        </script>
      </Helmet>

      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p itemProp="description">
              Hello there, I'm Vaishnavi. Welcome to <i>my little corner of the internet!</i>✨
            </p>
            <p>
              I'm a <strong>Master's student in Computer Science</strong> at{' '}
              <strong>The George Washington University</strong>. I'm passionate about building cool
              things with code, exploring the latest in tech, and connecting with people.
            </p>

            <p>
              But life's too short to be all about the ones and zeros. I'm a{' '}
              <strong>people person</strong> through and through and an unapologetic enthusiast for
              a few things that bring me immense joy. I'm a huge{' '}
              <strong>stationery aficionado</strong> — right now, I'm completely <i>geeking out</i>{' '}
              over the Pilot Kakuno fountain pens❤️ It’s safe to say my idea of a 'must-have' item
              is a little different, as you'll always find me <i>chasing the high</i> of a perfectly
              crafted notebook and pen.
            </p>

            <p>
              On a challenging day, you'll likely find me online, strategizing my way to victory in
              a game of <i>Catan</i>. That sweet victory is the perfect{' '}
              <strong>mood-booster!</strong> I'm a firm believer in balancing hard work with things
              that make you happy, which for me also includes a healthy dose of<i> Modern Family</i>
              !
            </p>

            <p>
              I love a good <strong>strategy</strong>, whether it's for a new software project or my
              next move in <i>Catan</i>. If you're passionate about building cool things and want to
              collaborate, I'd love to hear from you!👋🏻
            </p>

            <p>Here are a few technologies I've been working with recently:</p>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/about-me-monterey-beach.jpg" //either me.jpg or ups-shot.jpg
              width={500}
              height={800}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Vaishnavi Kamdi - Software Engineer"
              itemProp="image"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
