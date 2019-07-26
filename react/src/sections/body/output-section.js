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
  font-size: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100px;
  display: inline-block;
`;

const SignWrapper = styled.div`
  width: 100px;
  display: inline-block;
  text-align: right;
  text-align: end;
`;

const ClearButton = styled.button`
  background-color: grey;
  color: white;
  width: 100px;
  font-size: 1.5rem;
`;

const NumberArea = styled.div`
  background-color: grey;
  color: white;
  font-weight: bold;
  width: 400px;
  display: inline-block;
  font-size: 2rem;
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
    resetForm();
  };

  return (
    <OutputWrapper>
      <OutputArea>
        <SignWrapper>
          <SignButton onClick={e => onToggleSign(e)}>
            <SignSymbol visible={output < 0}>-</SignSymbol>
          </SignButton>
        </SignWrapper>
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
  resetForm: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  output: app.output
});

export default connect(
  mapStateToProps,
  { toggleOutputNegativity: toggleOutputNegativityAction, resetForm: resetFormAction }
)(OutputSection);
