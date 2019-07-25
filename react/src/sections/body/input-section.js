import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  updateOutput as updateOutputAction,
  updateInput as updateInputAction
} from 'common-actions';

const InputWrapper = styled.div`
  background-color: orange;
`;

const ApplyButton = styled.button`
  background-color: grey;
`;

const InputArea = styled.input.attrs({
  type: 'number'
})`
  background-color: green;
`;

export const InputSection = ({ input, updateOutput, updateInput }) => {
  const onInputChange = e => {
    e.preventDefault();
    updateInput(e.target.value);
  };

  const onApply = e => {
    e.preventDefault();
    updateOutput();
  };

  return (
    <InputWrapper>
      <InputArea name="inputArea" id="inputArea" onChange={onInputChange} value={input} />
      <ApplyButton onClick={onApply}>apply</ApplyButton>
    </InputWrapper>
  );
};

InputSection.propTypes = {
  input: PropTypes.string,
  updateOutput: PropTypes.func,
  updateInput: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input
});

export default connect(
  mapStateToProps,
  { updateOutput: updateOutputAction, updateInput: updateInputAction }
)(InputSection);
