import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  toggleOutputNegativity as toggleOutputNegativityAction,
  resetForm as resetFormAction,
  undoUpdateOutput as undoUpdateOutputAction
} from 'common-actions';
import Button from 'components/button';
import Wrapper from 'components/wrapper';

const OutputWrapper = styled.div`
  height: ${props => props.theme.sizes.shortElementHeight}px;
  margin-bottom: 8px;
`;

const OutputArea = styled.div`
  height: 100%;
`;

const NumberArea = styled(Wrapper)`
  background-color: ${props => props.theme.colors.standardGrey};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
  font-size: 1.6rem;
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
        <Wrapper>
          <Button
            onClick={e => onUndoClick(e)}
            disabled={previousOutputs.length === 0}
            text={'↶'}
            width={'50%'}
          />
          <Button
            onClick={e => onToggleSign(e)}
            text={output < 0 ? '-' : '+'}
            width={'50%'}
            pale
            disabled={!output}
          />
        </Wrapper>
        <NumberArea>{Math.abs(output)}</NumberArea>
        <Wrapper>
          <Button onClick={onClear} text={'✗ clear'} inverted fontSize={'1.2rem'} />
        </Wrapper>
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
