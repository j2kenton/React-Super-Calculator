import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateOutput as updateOutputAction } from 'common-actions';

const InputWrapper = styled.div`
  background-color: orange;
`;

const InputArea = styled.input.attrs({
  type: 'number'
})`
  background-color: green;
`;

export const InputSection = ({ input, updateOutput }) => {
  const onInputChange = e => {
    e.preventDefault();
    updateOutput('add', e.target.value);
  };

  return (
    <InputWrapper>
      <InputArea name="inputArea" id="inputArea" onChange={onInputChange} value={input} />
    </InputWrapper>
  );
};

InputSection.propTypes = {
  input: PropTypes.string,
  updateOutput: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input
});

export default connect(
  mapStateToProps,
  { updateOutput: updateOutputAction }
)(InputSection);
