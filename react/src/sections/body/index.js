import { useState } from 'react';
import { restoreLastFocus } from 'utils/tools';
import OutputSection from './output-section';
import InputSection from './input-section';
import NumberButtonSection from './number-button-section';

export const Body = () => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  return (
    <section>
      <OutputSection onButtonClick={() => restoreLastFocus(lastBlured)} />
      <InputSection onBlur={onBlur} onButtonClick={() => restoreLastFocus(lastBlured)} />
      <NumberButtonSection onButtonClick={() => restoreLastFocus(lastBlured)} />
    </section>
  );
};

export default Body;
