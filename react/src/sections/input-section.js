import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Wrapper from 'components/wrapper';
import {
  updateOutput as updateOutputAction,
  inputRemoveLastChar as inputRemoveLastCharAction,
  setOutputAndOperator as setOutputAndOperatorAction
} from 'common-actions';
import OperatorControls from 'components/operator-controls';
import Input from 'components/input';
import InputProcessingSection from 'components/input-processing-section';

const InputWrapper = styled.div`
  height: ${props => props.theme.sizes.veryShortElementHeight * 2}px;
`;

const InputsWrapper = styled(Wrapper)`
  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
`;

export const InputSection = ({ onButtonClick, onBlur, previousOutputs = [] }) => {
  const generateInputComponents = isNoHistory => (
    <InputsWrapper>
      {isNoHistory ? (
        <Wrapper> </Wrapper>
      ) : (
        <Input onButtonClick={onButtonClick} onBlur={onBlur} fullHeight />
      )}
    </InputsWrapper>
  );

  return (
    <InputWrapper>
      <OperatorControls onButtonClick={onButtonClick} />
      {generateInputComponents(previousOutputs.length === 0)}
      <InputProcessingSection onButtonClick={onButtonClick} />
    </InputWrapper>
  );
};

InputSection.propTypes = {
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  previousOutputs: PropTypes.array
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator,
  previousOutputs: app.previousOutputs
});

export default connect(
  mapStateToProps,
  {
    updateOutput: updateOutputAction,
    inputRemoveLastChar: inputRemoveLastCharAction,
    setOutputAndOperator: setOutputAndOperatorAction
  }
)(InputSection);
