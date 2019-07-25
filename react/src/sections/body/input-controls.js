import PropTypes from 'prop-types';
import styled from 'styled-components';
import OperatorControls from '../../components/operator-controls';

const InputWrapper = styled.div`
  background-color: orange;
`;

export const InputControls = ({ onButtonClick }) => (
  <InputWrapper>
    <OperatorControls onButtonClick={onButtonClick} />
  </InputWrapper>
);

InputControls.propTypes = {
  onButtonClick: PropTypes.func
};

export default InputControls;
