// VISITED AND VERIFIED
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout,
  Hero,
  About,
  Jobs,
  Featured,
  Projects,
  Contact,
  Publications,
  Head,
} from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Head
      title="Vaishnavi Kamdi - Software Engineer"
      description="Vaishnavi Kamdi is a Software Engineer with expertise in Computer Vision, Perception and AI. View Mayank's portfolio, projects, and get in touch."
      keywords="Vaishnavi Kamdi, Software Engineer, AI engineer, Backend Developer, Vaishnavi Kamdi portfolio"
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

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
