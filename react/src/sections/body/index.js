import { useState } from 'react';
import styled from 'styled-components';
import { restoreLastFocus } from 'utils/tools';
import OutputSection from './output-section';
import InputSection from './input-section';
import NumberButtonSection from './number-button-section';

const BodySection = styled.section``;

export const Body = () => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  return (
    <BodySection>
      <OutputSection onButtonClick={() => restoreLastFocus(lastBlured)} />
      <InputSection onBlur={onBlur} onButtonClick={() => restoreLastFocus(lastBlured)} />
      <NumberButtonSection onButtonClick={() => restoreLastFocus(lastBlured)} />
    </BodySection>
  );
};

export default Body;
