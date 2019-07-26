import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  box-sizing: border-box;
  vertical-align: top;
  color: ${props => !props.disabled && (props.color || '#444444')};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  font-size: ${props => props.fontSize || '2rem'};
  background: ${props => (props.disabled ? '#bbbbbb' : props.background)};
  padding: ${props => props.padding};
  flex: ${props => props.flex};
  cursor: ${props => props.disabled && 'not-allowed'};
  ${props =>
    !props.disabled &&
    props.selected &&
    css`
      background: '#a9a9a9';
      color: #ffffff;
    `}
  ${props =>
    !props.disabled &&
    props.inverted &&
    css`
      background: #555555;
      color: #ffffff;
    `}
`;

export const Button = ({ text, ...props }) => <StyledButton {...props}>{text}</StyledButton>;

Button.propTypes = {
  text: PropTypes.string
};

export default Button;
