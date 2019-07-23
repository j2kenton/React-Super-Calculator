import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setOutput as setOutputAction } from 'common-actions';

const InputWrapper = styled.div`
  background-color: orange;
`;

const InputArea = styled.input.attrs({
  type: 'number'
})`
  background-color: green;
`;

export const InputSection = ({ output, setOutput }) => {
  const onInputChange = e => {
    setOutput(e.target.value);
  };

  return (
    <InputWrapper>
      <InputArea name="inputArea" id="inputArea" onChange={onInputChange} value={output} />
    </InputWrapper>
  );
};

InputSection.propTypes = {
  output: PropTypes.string,
  setOutput: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  output: app.output
});

export default connect(
  mapStateToProps,
  { setOutput: setOutputAction }
)(InputSection);
