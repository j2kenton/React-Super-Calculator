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
import OperatorControls from '../../components/operator-controls';

const InputWrapper = styled.div`
  height: 86px;
`;

const InputsWrapper = styled.div`
  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  height: 100%;
  display: inline-block;
  vertical-align: top;
`;

const ButtonsWrapper = styled.div`
  width: 100px;
  display: inline-block;
  vertical-align: top;
  height: 100%;
`;

const ApplyButton = styled.button`
  background-color: grey;
  color: white;
  width: 100%;
  height: 50%;
`;

const BackspaceButton = styled.button`
  background-color: grey;
  color: white;
  width: 100%;
  height: 50%;
`;

const InputArea = styled.div`
  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  height: 50%;
`;

const InputField = styled.input.attrs({
  type: 'text'
})`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
`;

const PreviewSection = styled.div`
  color: grey;

  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  height: 50%;
  padding: 10px;
  box-sizing: border-box;
  background-color: whitesmoke;
`;

export const InputSection = ({
  preview,
  input,
  updateOutput,
  updateInput,
  onBlur,
  onButtonClick,
  inputRemoveLastChar,
  setOutputAndOperator
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

  const onBackspace = e => {
    e.preventDefault();
    onButtonClick();
    if (input) {
      inputRemoveLastChar();
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
    <InputWrapper>
      <OperatorControls onButtonClick={onButtonClick} />
      <InputsWrapper>
        <InputArea>
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
        <PreviewSection>{preview}</PreviewSection>
      </InputsWrapper>
      <ButtonsWrapper>
        <BackspaceButton onClick={onBackspace} disabled={!input}>
          ⇐
        </BackspaceButton>
        <ApplyButton onClick={onApply} disabled={!isInputUsable(input)}>
          apply
        </ApplyButton>
      </ButtonsWrapper>
    </InputWrapper>
  );
};

InputSection.propTypes = {
  preview: PropTypes.string,
  input: PropTypes.string,
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  inputRemoveLastChar: PropTypes.func,
  setOutputAndOperator: PropTypes.func
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
