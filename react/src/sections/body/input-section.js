import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  updateOutput as updateOutputAction,
  updateInput as updateInputAction
} from 'common-actions';
import { OPERATORS } from 'constants/numeric';
import OperatorControls from '../../components/operator-controls';

const InputWrapper = styled.div`
  background-color: orange;
`;

const OperatorDisplay = styled.span`
  background-color: lilac;
`;

const ApplyButton = styled.button`
  background-color: grey;
`;

const InputArea = styled.input.attrs({
  type: 'number'
})`
  background-color: green;
`;

export const InputSection = ({
  input,
  updateOutput,
  updateInput,
  operator,
  onBlur,
  onButtonClick
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

  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <InputWrapper>
      <OperatorControls onButtonClick={onButtonClick} />
      <InputArea
        name="inputArea"
        id="inputArea"
        onChange={onInputChange}
        value={input}
        onBlur={onBlur}
        ref={ref}
      />
      <ApplyButton onClick={onApply} disabled={!input}>
        apply
      </ApplyButton>
    </InputWrapper>
  );
};

InputSection.propTypes = {
  input: PropTypes.string,
  operator: PropTypes.string,
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  { updateOutput: updateOutputAction, updateInput: updateInputAction }
)(InputSection);
