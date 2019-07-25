import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const InputArea = styled.input.attrs({
  type: 'text'
})`
  background-color: green;
`;

export const InputSection = ({
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
    if (input) {
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
        <ApplyButton onClick={onBackspace} disabled={!input}>
          ⇐
        </ApplyButton>
      </Row>
      <Row>
        <ApplyButton onClick={onApply} disabled={!input}>
          apply
        </ApplyButton>
      </Row>
    </InputWrapper>
  );
};

InputSection.propTypes = {
  input: PropTypes.string,
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  inputRemoveLastChar: PropTypes.func
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
    inputRemoveLastChar: inputRemoveLastCharAction
  }
)(InputSection);
