import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OPERATORS } from 'constants/numeric';
import { isInputUsable } from 'utils/tools';
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
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1.3rem;
`;

export const InputSection = ({
  input,
  updateOutput,
  updateInput,
  onBlur,
  onButtonClick,
  setOutputAndOperator,
  fullHeight
}) => {
  const onInputChange = e => {
    e.preventDefault();
    updateInput(e.target.value);
  };

  const onApply = e => {
    e.preventDefault();
    onButtonClick();
    if (isInputUsable(input)) {
      updateOutput();
    }
  };

  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleKeyPress = e => {
    const matchingOperator = Object.entries(OPERATORS).find(
      ([, value]) => value.keyboardChar === e.key
    );
    if (matchingOperator && isInputUsable(input)) {
      setOutputAndOperator(matchingOperator[0]);
    } else if (e.key === 'Enter') {
      onApply(e);
    }
  };

  return (
    <InputArea fullHeight={fullHeight}>
      <InputField
        name="inputArea"
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
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  setOutputAndOperator: PropTypes.func,
  fullHeight: PropTypes.bool
};

const mapStateToProps = ({ app }) => ({
  preview: app.preview,
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
