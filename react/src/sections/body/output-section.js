import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  toggleOutputNegativity as toggleOutputNegativityAction,
  resetForm as resetFormAction,
  undoUpdateOutput as undoUpdateOutputAction
} from 'common-actions';
import Button from 'components/button';

const OutputWrapper = styled.div`
  height: 43px;
  margin-bottom: 20px;
`;

const OutputArea = styled.div`
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

const NumberArea = styled.div`
  background-color: grey;
  color: white;
  font-weight: bold;

  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  display: inline-block;
  font-size: 2rem;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 10px;
  padding-top: 5px;
`;

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
          <Button
            onClick={e => onUndoClick(e)}
            disabled={previousOutputs.length === 0}
            text={'↶'}
            width={'50%'}
          />
          <Button onClick={e => onToggleSign(e)} text={output < 0 ? '-' : '+'} width={'50%'} />
        </ToggleUndoWrapper>
        <NumberArea>{Math.abs(output)}</NumberArea>
        <ButtonWrapper>
          <Button onClick={onClear} text={'clear'} inverted fontSize={'1.3rem'} />
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
