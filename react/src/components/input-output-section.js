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
import Input from 'components/input';

const NumberArea = styled(Wrapper)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  font-weight: bold;
  width: ${props => props.theme.sizes.wideColumn - props.theme.sizes.narrowColumn / 2}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(
      100vw - ${props => props.theme.sizes.narrowColumn * 2 + props.theme.sizes.narrowColumn / 2}px
    );
  }
  font-size: 1.6rem;
  padding-left: 10px;
  padding-top: 5px;
`;

export const OutputSection = ({
  output,
  toggleOutputNegativity,
  onButtonClick,
  onBlur,
  previousOutputs = []
}) => {
  const onToggleSign = e => {
    e.preventDefault();
    onButtonClick();
    toggleOutputNegativity();
  };

  if (previousOutputs.length === 0) {
    return (
      <Wrapper width={'400'}>
        <Input fullHeight onButtonClick={onButtonClick} onBlur={onBlur} />
      </Wrapper>
    );
  }
  return (
    <>
      <Button
        onClick={e => onToggleSign(e)}
        text={output < 0 ? '-' : '+'}
        width={'50px'}
        pale
        disabled={!output}
        border={'1px solid #eeeeee'}
      />
      <NumberArea>{Math.abs(output)}</NumberArea>
    </>
  );
};

OutputSection.propTypes = {
  output: PropTypes.number,
  toggleOutputNegativity: PropTypes.func,
  onButtonClick: PropTypes.func,
  onBlur: PropTypes.func,
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
