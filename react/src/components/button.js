import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  box-shadow: 0px 2px 0px #999999, 0px 1px 6px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
  vertical-align: top;
  color: ${props => !props.disabled && (props.color || props.theme.colors.buttonText)};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  font-size: ${props => props.fontSize || '2rem'};
  background: ${props =>
    props.disabled ? props.theme.colors.disabledBackground : props.background};
  padding: ${props => props.padding};
  flex: ${props => props.flex};
  border: ${props => props.border};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  
  ${props =>
    !props.disabled &&
    props.inverted &&
    css`
      color: ${props.theme.colors.white};
      background: ${props.theme.colors.inverted.buttonBackground};
      &:hover,
      &:active {
        background: ${props.theme.colors.inverted.buttonBackgroundLightened};
      }
    `}
    
    ${props =>
      !props.disabled &&
      props.selected &&
      css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.darkestGrey};
        &:hover,
        &:active {
          background: ${props.theme.colors.darkestGreyLightened};
        }
      `}
    
  ${props =>
    !props.disabled &&
    props.pale &&
    css`
      color: ${props.theme.colors.black};
      background: ${props.theme.colors.white};
    `}
`;

export const Button = ({ text = '', ...props }) => <StyledButton {...props}>{text}</StyledButton>;

Button.propTypes = {
  text: PropTypes.string
};

export default Button;
