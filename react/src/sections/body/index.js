import styled from 'styled-components';
import OutputSection from './output-section';

const StyledSection = styled.section`
  background-color: pink;
`;

export const Body = () => (
  <StyledSection>
    <OutputSection />
  </StyledSection>
);

export default Body;
