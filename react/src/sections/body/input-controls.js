import styled from 'styled-components';
import OperatorControls from '../../components/operator-controls';

const InputWrapper = styled.div`
  background-color: orange;
`;

export const InputControls = () => (
  <InputWrapper>
    <OperatorControls />
  </InputWrapper>
);

export default InputControls;
