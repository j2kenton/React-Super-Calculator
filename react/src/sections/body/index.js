import { useState } from 'react';
import styled from 'styled-components';
import { restoreLastFocus } from 'utils/tools';
import OutputSection from './output-section';
import InputSection from './input-section';
import InputControls from './input-controls';

const StyledSection = styled.section`
  background-color: pink;
`;

export const Body = () => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  const onButtonBlur = () => {
    setLastBlured(null);
  };

  return (
    <StyledSection>
      <OutputSection />
      <InputSection onBlur={onBlur} onButtonClick={() => restoreLastFocus(lastBlured)} />
      <InputControls onBlur={onButtonBlur} onButtonClick={() => restoreLastFocus(lastBlured)} />
    </StyledSection>
  );
};

export default Body;
