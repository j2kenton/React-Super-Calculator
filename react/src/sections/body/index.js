import { useState } from 'react';
import styled from 'styled-components';
import { restoreLastFocus } from 'utils/tools';
import OutputSection from './output-section';
import InputSection from './input-section';

const StyledSection = styled.section`
  background-color: pink;
`;

export const Body = () => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  return (
    <StyledSection>
      <OutputSection onButtonClick={() => restoreLastFocus(lastBlured)} />
      <InputSection onBlur={onBlur} onButtonClick={() => restoreLastFocus(lastBlured)} />
    </StyledSection>
  );
};

export default Body;
