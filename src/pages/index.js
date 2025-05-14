// VISITED AND VERIFIED
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact, Publications, Head } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Head 
        title="Mayank Deshpande - Robotics Software Engineer"
        description="Mayank Deshpande is a Robotics Software Engineer with expertise in Computer Vision, Perception and AI. View Mayank's portfolio, projects, and get in touch."
        keywords="Mayank Deshpande, robotics engineer, computer vision engineer, AI engineer, perception engineer, Mayank Deshpande portfolio, robotics software developer"
      />

      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Projects />
        <Publications />
        <Contact />
      </StyledMainContainer>
    </Layout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
