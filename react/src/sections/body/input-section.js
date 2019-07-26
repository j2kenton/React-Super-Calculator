import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import Input from 'components/input';

const InputWrapper = styled.div`
  height: ${props => props.theme.sizes.shortElementHeight * 2}px;
`;

const InputsWrapper = styled(Wrapper)`
  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
`;

const PreviewSection = styled(Wrapper)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.standardGrey};
  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
  height: 50%;
  padding: 10px;
  background-color: ${props => props.theme.colors.paleBackground};
`;

export const InputSection = ({
  preview,
  input,
  updateOutput,
  onButtonClick,
  inputRemoveLastChar,
  onBlur,
  previousOutputs = []
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

  const isNoHistory = previousOutputs.length === 0;

  return (
    <InputWrapper>
      <OperatorControls onButtonClick={onButtonClick} />
      <InputsWrapper>
        {isNoHistory ? (
          <Wrapper>-</Wrapper>
        ) : (
          <Input onButtonClick={onButtonClick} onBlur={onBlur} />
        )}
        <PreviewSection>{preview}</PreviewSection>
      </InputsWrapper>
      <Wrapper>
        <Button onClick={onBackspace} disabled={!input} text={'⇐'} inverted height={'50%'} />
        <Button
          onClick={onApply}
          disabled={!isInputUsable(input)}
          text={'='}
          inverted
          height={'50%'}
        />
      </Wrapper>
    </InputWrapper>
  );
};

InputSection.propTypes = {
  preview: PropTypes.string,
  input: PropTypes.string,
  updateOutput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func,
  inputRemoveLastChar: PropTypes.func,
  previousOutputs: PropTypes.array
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
    updateInput: updateInputAction,
    inputRemoveLastChar: inputRemoveLastCharAction,
    setOutputAndOperator: setOutputAndOperatorAction
  }
)(InputSection);
