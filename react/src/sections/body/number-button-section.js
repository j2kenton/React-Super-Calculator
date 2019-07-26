import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appendToInput as appendToInputAction } from 'common-actions';
import Button from 'components/button';

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

export const NumberButtonSection = ({ appendToInput, onButtonClick }) => {
  const onNumberButtonClick = (e, text) => {
    e.preventDefault();
    onButtonClick();
    appendToInput(text);
  };

  return (
    <ButtonsWrapper>
      {['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', '.'].map(text => (
        <Button
          onClick={e => onNumberButtonClick(e, text)}
          key={text}
          flex={'1 0 33%'}
          inverted
          padding={'1rem'}
          text={text}
        />
      ))}
    </ButtonsWrapper>
  );
};

NumberButtonSection.propTypes = {
  appendToInput: PropTypes.func,
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
