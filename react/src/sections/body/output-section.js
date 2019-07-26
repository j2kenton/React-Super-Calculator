import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  toggleOutputNegativity as toggleOutputNegativityAction,
  resetForm as resetFormAction
} from 'common-actions';

const OutputWrapper = styled.div`
  background-color: blue;
`;

const OutputArea = styled.div`
  background-color: yellow;
`;

const SignButton = styled.button`
  background-color: white;
`;

const ClearButton = styled.button`
  background-color: grey;
  color: white;
`;

const NumberArea = styled.span`
  background-color: grey;
  color: white;
  font-weight: bold;
`;

const SignSymbol = styled.span`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const OutputSection = ({ output, toggleOutputNegativity, onButtonClick, resetForm }) => {
  const onToggleSign = e => {
    e.preventDefault();
    onButtonClick();
    toggleOutputNegativity();
  };

  const onClear = e => {
    e.preventDefault();
    onButtonClick();
    if (output) {
      resetForm();
    }
  };

  return (
    <OutputWrapper>
      <OutputArea>
        <SignButton onClick={e => onToggleSign(e)}>
          <SignSymbol visible={output < 0}>-</SignSymbol>
        </SignButton>
        <NumberArea>{Math.abs(output)}</NumberArea>
        <ClearButton onClick={onClear} disabled={!output}>
          clear
        </ClearButton>
      </OutputArea>
    </OutputWrapper>
  );
};

OutputSection.propTypes = {
  output: PropTypes.number,
  toggleOutputNegativity: PropTypes.func,
  onButtonClick: PropTypes.func,
  resetForm: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  output: app.output
});

export default connect(
  mapStateToProps,
  { toggleOutputNegativity: toggleOutputNegativityAction, resetForm: resetFormAction }
)(OutputSection);
