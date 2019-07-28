import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  resetForm as resetFormAction,
  undoUpdateOutput as undoUpdateOutputAction
} from 'common-actions';
import Button from 'components/button';
import Wrapper from 'components/wrapper';
import InputOutputSection from 'components/input-output-section';

const OutputWrapper = styled.div`
  overflow: hidden;
  height: ${props => props.theme.sizes.shortElementHeight}px;
  margin-bottom: 8px;
`;

const OutputArea = styled.div`
  height: 100%;
`;

export const OutputSection = ({
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
        <InputOutputSection />
        <Wrapper>
          <Button onClick={onClear} text={'✗'} inverted fontSize={'1.5rem'} />
        </Wrapper>
      </OutputArea>
    </OutputWrapper>
  );
};

OutputSection.propTypes = {
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
)(OutputSection);
