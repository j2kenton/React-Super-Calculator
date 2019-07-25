import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { OPERATORS } from 'constants/numeric';
import { setOperator as setOperatorAction } from 'common-actions';

const OperatorsWrapper = styled.div`
  background-color: purple;
`;

const StyledButton = styled.button`
  background-color: white;
`;

export const OperatorControls = ({ setOperator, operator, onButtonClick }) => {
  const onOperatorSelection = operatorKey => {
    onButtonClick();
    setOperator(operatorKey);
  };
  return (
    <OperatorsWrapper>
      {Object.entries(OPERATORS).map(entry => (
        <StyledButton key={entry[0]} onClick={() => onOperatorSelection(entry[0])}>
          {entry[1].symbol}
        </StyledButton>
      ))}
    </OperatorsWrapper>
  );
};

OperatorControls.propTypes = {
  operator: PropTypes.string,
  setOperator: PropTypes.func,
  onButtonClick: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  { setOperator: setOperatorAction }
)(OperatorControls);
