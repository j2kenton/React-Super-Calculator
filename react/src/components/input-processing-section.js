import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isInputUsable } from 'utils/tools';
import Button from 'components/button';
import Wrapper from 'components/wrapper';
import {
  updateOutput as updateOutputAction,
  inputRemoveLastChar as inputRemoveLastCharAction,
  setOutputAndOperator as setOutputAndOperatorAction
} from 'common-actions';

export const InputSection = ({
  preview = '',
  input = '',
  updateOutput,
  onButtonClick,
  inputRemoveLastChar
}) => {
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

  return (
    <Wrapper>
      <Button onClick={onBackspace} disabled={!input} text={'⇐'} inverted height={'50%'} />
      <Button
        onClick={onApply}
        disabled={!isInputUsable(input)}
        text={'='}
        title={preview}
        inverted
        height={'50%'}
      />
    </Wrapper>
  );
};

InputSection.propTypes = {
  preview: PropTypes.string,
  input: PropTypes.string,
  updateOutput: PropTypes.func,
  inputRemoveLastChar: PropTypes.func,
  onButtonClick: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  preview: app.preview,
  input: app.input,
  operator: app.operator,
  previousOutputs: app.previousOutputs
});

export default connect(
  mapStateToProps,
  {
    updateOutput: updateOutputAction,
    inputRemoveLastChar: inputRemoveLastCharAction,
    setOutputAndOperator: setOutputAndOperatorAction
  }
)(InputSection);
