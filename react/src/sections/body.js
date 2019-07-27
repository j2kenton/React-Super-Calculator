import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { restoreLastFocus } from 'utils/tools';
import { resetForm as resetFormAction } from 'common-actions';
import OutputSection from './output-section';
import InputSection from './input-section';
import NumberButtonSection from './number-button-section';

const StyledSection = styled.section`
  padding: 10px;
  margin: -11px;
  border: 1px solid #111111;
  background: linear-gradient(135deg, #111111 0%, #000000 100%);
`;

export const Body = ({ resetForm }) => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  const restoreFocus = () => {
    restoreLastFocus(lastBlured);
  };

  useEffect(
    () => {
      const handleKeydown = event => {
        if (event.keyCode === 27) {
          resetForm();
        }
      };
      document.addEventListener('keydown', handleKeydown, false);
    },
    [resetForm]
  );

  return (
    <StyledSection>
      <OutputSection onButtonClick={restoreFocus} />
      <InputSection onBlur={onBlur} onButtonClick={restoreFocus} />
      <NumberButtonSection onButtonClick={restoreFocus} />
    </StyledSection>
  );
};

Body.propTypes = {
  resetForm: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  preview: app.preview,
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  {
    resetForm: resetFormAction
  }
)(Body);
