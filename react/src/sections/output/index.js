import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  resetForm as resetFormAction,
  undoUpdateOutput as undoUpdateOutputAction
} from 'common-actions';
import Button from 'components/button';
import Wrapper from 'components/wrapper';
import InputOutput from './input-output-section';

const OutputWrapper = styled.div`
  overflow: hidden;
  height: ${props => props.theme.sizes.shortElementHeight}px;
  margin-bottom: 8px;
`;

const OutputArea = styled.div`
  height: 100%;
`;

export const Output = ({ onButtonClick, resetForm, undoUpdateOutput, previousOutputs = [] }) => {
  const onUndoClick = e => {
    e.preventDefault();
    onButtonClick();
    undoUpdateOutput();
  };

  const onClear = e => {
    e.preventDefault();
    onButtonClick();
    resetForm();
  };

  const isNoHistory = previousOutputs.length === 0;
  return (
    <OutputWrapper>
      <OutputArea>
        <Wrapper>
          <Button onClick={e => onUndoClick(e)} disabled={isNoHistory} text={'↶'} inverted />
        </Wrapper>
        <InputOutput />
        <Wrapper>
          <Button onClick={onClear} text={'✗'} inverted fontSize={'1.5rem'} />
        </Wrapper>
      </OutputArea>
    </OutputWrapper>
  );
};

Output.propTypes = {
  onButtonClick: PropTypes.func,
  resetForm: PropTypes.func,
  undoUpdateOutput: PropTypes.func,
  previousOutputs: PropTypes.array
};

const mapStateToProps = ({ app }) => ({
  output: app.output,
  previousOutputs: app.previousOutputs
});

export default connect(
  mapStateToProps,
  {
    resetForm: resetFormAction,
    undoUpdateOutput: undoUpdateOutputAction
  }
)(Output);
