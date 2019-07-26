import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isInputUsable } from 'utils/tools';
import styled from 'styled-components';
import {
  updateOutput as updateOutputAction,
  updateInput as updateInputAction,
  inputRemoveLastChar as inputRemoveLastCharAction
} from 'common-actions';
import OperatorControls from '../../components/operator-controls';

const InputWrapper = styled.div`
  background-color: orange;
`;

const Row = styled.div`
  border: 1px solid black;
`;

const ApplyButton = styled.button`
  background-color: grey;
`;

const BackspaceButton = styled.button`
  background-color: grey;
  color: white;
`;

const InputArea = styled.input.attrs({
  type: 'text'
})`
  background-color: green;
`;

const PreviewSection = styled.div`
  color: grey;
  float: left;
  min-width: 100px;
  min-height: 10px;
`;

export const InputSection = ({
  preview,
  input,
  updateOutput,
  updateInput,
  onBlur,
  onButtonClick,
  inputRemoveLastChar
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

  return (
    <InputWrapper>
      <Row>
        <OperatorControls onButtonClick={onButtonClick} />
        <InputArea
          name="inputArea"
          id="inputArea"
          onChange={onInputChange}
          value={input}
          onBlur={onBlur}
          ref={ref}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onApply(e);
            }
          }}
        />
        <BackspaceButton onClick={onBackspace} disabled={!input}>
          ⇐
        </BackspaceButton>
      </Row>
      <Row>
        <PreviewSection>{preview}</PreviewSection>
        <ApplyButton onClick={onApply} disabled={!isInputUsable(input)}>
          apply
        </ApplyButton>
      </Row>
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
  inputRemoveLastChar: PropTypes.func
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
    inputRemoveLastChar: inputRemoveLastCharAction
  }
)(InputSection);
