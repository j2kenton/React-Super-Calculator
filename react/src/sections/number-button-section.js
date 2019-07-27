import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appendToInput as appendToInputAction } from 'common-actions';
import Button from 'components/button';
import { NUMBER_BUTTONS } from 'constants/numeric';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: ${props => props.theme.sizes.wideColumn}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: calc(100vw - ${props => props.theme.sizes.narrowColumn * 2}px);
  }
  margin-left: ${props => props.theme.sizes.narrowColumn}px;
`;

export const NumberButtonSection = ({ appendToInput, onButtonClick }) => {
  const onNumberButtonClick = (e, text) => {
    e.preventDefault();
    onButtonClick();
    appendToInput(text);
  };

  return (
    <ButtonsWrapper>
      {NUMBER_BUTTONS.map(text => (
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
