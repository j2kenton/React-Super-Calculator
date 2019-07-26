import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  toggleOutputNegativity as toggleOutputNegativityAction,
  resetForm as resetFormAction,
  undoUpdateOutput as undoUpdateOutputAction
} from 'common-actions';

const OutputWrapper = styled.div`
  height: 43px;
  margin-bottom: 20px;
`;

const OutputArea = styled.div`
  height: 100%;
`;

const SignButton = styled.button`
  font-size: 2rem;
  width: 50%;
  height: 100%;
`;

const UndoButton = styled.button`
  font-size: 2rem;
  width: 50%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
`;

const ToggleUndoWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: inline-block;
  text-align: right;
  text-align: end;
`;

const ClearButton = styled.button`
  background-color: grey;
  color: white;
  width: 100px;
  height: 100%;
  font-size: 1.5rem;
`;

const NumberArea = styled.div`
  background-color: grey;
  color: white;
  font-weight: bold;
  width: 400px;
  display: inline-block;
  font-size: 2rem;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 10px;
  padding-top: 5px;
`;

const SignSymbol = styled.span``;

export const OutputSection = ({
  output,
  toggleOutputNegativity,
  onButtonClick,
  resetForm,
  undoUpdateOutput,
  previousOutputs = []
}) => {
  const onUndoClick = e => {
    e.preventDefault();
    onButtonClick();
    undoUpdateOutput();
  };

  const onToggleSign = e => {
    e.preventDefault();
    onButtonClick();
    toggleOutputNegativity();
  };

  const onClear = e => {
    e.preventDefault();
    onButtonClick();
    resetForm();
  };

  return (
    <OutputWrapper>
      <OutputArea>
        <ToggleUndoWrapper>
          <UndoButton onClick={e => onUndoClick(e)} disabled={previousOutputs.length === 0}>
            ↶
          </UndoButton>
          <SignButton onClick={e => onToggleSign(e)}>
            <SignSymbol>{output < 0 ? '-' : '+'}</SignSymbol>
          </SignButton>
        </ToggleUndoWrapper>
        <NumberArea>{Math.abs(output)}</NumberArea>
        <ButtonWrapper>
          <ClearButton onClick={onClear}>clear</ClearButton>
        </ButtonWrapper>
      </OutputArea>
    </OutputWrapper>
  );
};

OutputSection.propTypes = {
  output: PropTypes.number,
  toggleOutputNegativity: PropTypes.func,
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
    toggleOutputNegativity: toggleOutputNegativityAction,
    resetForm: resetFormAction,
    undoUpdateOutput: undoUpdateOutputAction
  }
)(OutputSection);
