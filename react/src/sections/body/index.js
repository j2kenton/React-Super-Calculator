import styled from 'styled-components';
import OutputSection from './output-section';
import InputSection from './input-section';

const StyledSection = styled.section`
  background-color: pink;
`;

export const Body = () => (
  <StyledSection>
    <OutputSection />
    <InputSection />
  </StyledSection>
);

export default Body;
