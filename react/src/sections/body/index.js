import styled from 'styled-components';
import OutputSection from './output-section';
import InputSection from './input-section';
import InputControls from './input-controls';

const StyledSection = styled.section`
  background-color: pink;
`;

export const Body = () => (
  <StyledSection>
    <OutputSection />
    <InputSection />
    <InputControls />
  </StyledSection>
);

export default Body;
