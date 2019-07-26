import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { OPERATORS } from 'constants/numeric';
import { setOperator as setOperatorAction } from 'common-actions';
import Button from 'components/button';

const OperatorsWrapper = styled.div`
  background-color: purple;
  width: 100px;
  display: inline-block;
`;

export const OperatorControls = ({ setOperator, operator, onButtonClick, selected }) => {
  const onOperatorSelection = operatorKey => {
    onButtonClick();
    setOperator(operatorKey);
  };

  return (
    <OperatorsWrapper>
      {Object.entries(OPERATORS).map(entry => (
        <Button
          key={entry[0]}
          onClick={() => onOperatorSelection(entry[0])}
          selected={entry[0] === operator}
          width={'50%'}
          height={'50%'}
          text={entry[1].symbol}
        />
      ))}
    </OperatorsWrapper>
  );
};

OperatorControls.propTypes = {
  operator: PropTypes.string,
  setOperator: PropTypes.func,
  onButtonClick: PropTypes.func,
  selected: PropTypes.bool
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  { setOperator: setOperatorAction }
)(OperatorControls);
