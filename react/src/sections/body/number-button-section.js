import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appendToInput as appendToInputAction } from 'common-actions';

const ButtonsWrapper = styled.div`
  background-color: green;
  display: flex;
  flex-wrap: wrap;

  width: 400px;
  @media (max-width: 600px) {
    width: calc(100vw - 200px);
  }
  margin-left: 100px;
`;

const NumberButton = styled.button`
  background-color: grey;
  flex: 1 0 33%;
  padding: 1rem;
  font-size: 2rem;
  color: white;
`;

export const NumberButtonSection = ({ input, appendToInput, operator, onBlur, onButtonClick }) => {
  const onNumberButtonClick = (e, text) => {
    e.preventDefault();
    onButtonClick();
    appendToInput(text);
  };

  return (
    <ButtonsWrapper>
      {['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'].map(text => (
        <NumberButton onClick={e => onNumberButtonClick(e, text)} key={text}>
          {text}
        </NumberButton>
      ))}
    </ButtonsWrapper>
  );
};

NumberButtonSection.propTypes = {
  input: PropTypes.string,
  operator: PropTypes.string,
  appendToInput: PropTypes.func,
  onBlur: PropTypes.func,
  onButtonClick: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  { appendToInput: appendToInputAction }
)(NumberButtonSection);
