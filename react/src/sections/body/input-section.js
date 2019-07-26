import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OPERATORS } from 'constants/numeric';
import { isInputUsable } from 'utils/tools';
import Button from 'components/button';
import styled from 'styled-components';
import Wrapper from 'components/wrapper';
import {
  updateOutput as updateOutputAction,
  updateInput as updateInputAction,
  inputRemoveLastChar as inputRemoveLastCharAction,
  setOutputAndOperator as setOutputAndOperatorAction
} from 'common-actions';
import OperatorControls from 'components/operator-controls';

const InputWrapper = styled.div`
  height: 86px;
`;

const InputsWrapper = styled(Wrapper)`
  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
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
  font-size: 1.3rem;
`;

const PreviewSection = styled(Wrapper)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.standardGrey};
  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  height: 50%;
  padding: 10px;
  background-color: ${props => props.theme.colors.paleBackgroundColor};
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
      <Wrapper>
        <Button
          onClick={onBackspace}
          disabled={!input}
          text={'⇐ delete'}
          inverted
          height={'50%'}
          fontSize={'1.2rem'}
        />
        <Button
          onClick={onApply}
          disabled={!isInputUsable(input)}
          text={'✓ apply'}
          inverted
          height={'50%'}
          fontSize={'1.2rem'}
        />
      </Wrapper>
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
