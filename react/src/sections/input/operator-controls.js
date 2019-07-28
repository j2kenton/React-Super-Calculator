import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { OPERATORS } from 'constants/numeric';
import { setOutputAndOperator as setOutputAndOperatorAction } from 'common-actions';
import Button from 'components/button';

const OperatorsWrapper = styled.div`
  width: ${props => props.theme.sizes.narrowColumn}px;
  display: inline-block;
`;

export const OperatorControls = ({ setOutputAndOperator, operator, onButtonClick }) => {
  const onOperatorSelection = operatorKey => {
    onButtonClick();
    setOutputAndOperator(operatorKey);
  };

  return (
    <OperatorsWrapper>
      {Object.entries(OPERATORS).map(([key, value]) => (
        <Button
          key={key}
          onClick={() => onOperatorSelection(key)}
          selected={key === operator}
          width={'50%'}
          height={'50%'}
          text={value.symbol}
          inverted
        />
      ))}
    </OperatorsWrapper>
  );
};

OperatorControls.propTypes = {
  operator: PropTypes.string,
  setOutputAndOperator: PropTypes.func,
  onButtonClick: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  { setOutputAndOperator: setOutputAndOperatorAction }
)(OperatorControls);
