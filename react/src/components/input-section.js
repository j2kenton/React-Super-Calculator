import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OPERATORS } from 'constants/numeric';
import { isInputValid, isInputUsable } from 'utils/tools';
import styled from 'styled-components';
import {
  updateOutput as updateOutputAction,
  updateInput as updateInputAction,
  inputRemoveLastChar as inputRemoveLastCharAction,
  setOutputAndOperator as setOutputAndOperatorAction
} from 'common-actions';

const InputArea = styled.div`
  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
  height: ${props => (props.fullHeight ? '100%' : '50%')};
`;

const InputField = styled.input.attrs({
  type: 'text'
})`
  height: 100%;
  width: 100%;
  padding: 0 30px;
  font-size: 1.5rem;
`;

export const InputSection = ({
  input = '',
  updateOutput,
  updateInput,
  onBlur,
  setOutputAndOperator,
  fullHeight = false,
  operator
}) => {
  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  const onInputChange = e => {
    e.preventDefault();
    if (isInputValid(e.target.value)) {
      updateInput(e.target.value);
    }
  };

  const onApply = e => {
    e.preventDefault();
    if (isInputValid(input)) {
      updateOutput();
    }
  };

  const handleKeyPress = e => {
    const keyPressed = e.key;
    const matchingOperator = Object.entries(OPERATORS).find(
      operatorSingle => operatorSingle[1].keyboardChar === keyPressed
    );
    const isApplyingInput = isInputUsable(input);
    const isSelectingOperator = !OPERATORS[operator] || !input;
    const isOperatorChar = !!matchingOperator;
    const isAddingNegativeSign = e.currentTarget.selectionStart === 0 && keyPressed === '-';
    const isUpdatingOperator =
      isOperatorChar && (isApplyingInput || isSelectingOperator) && !isAddingNegativeSign;
    if (isUpdatingOperator) {
      e.preventDefault();
      setOutputAndOperator(matchingOperator[0]);
      return;
    }
    if (keyPressed === 'Enter') {
      e.preventDefault();
      onApply(e);
    }
  };

  return (
    <InputArea fullHeight={fullHeight}>
      <InputField
        name="inputArea"
        autoComplete="off"
        id="inputArea"
        onChange={onInputChange}
        value={input}
        onBlur={onBlur}
        ref={ref}
        onKeyPress={handleKeyPress}
      />
    </InputArea>
  );
};

InputSection.propTypes = {
  input: PropTypes.string,
  operator: PropTypes.string,
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func,
  onBlur: PropTypes.func,
  setOutputAndOperator: PropTypes.func,
  fullHeight: PropTypes.bool
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  {
    updateOutput: updateOutputAction,
    updateInput: updateInputAction,
    inputRemoveLastChar: inputRemoveLastCharAction,
    setOutputAndOperator: setOutputAndOperatorAction
  }
)(InputSection);
