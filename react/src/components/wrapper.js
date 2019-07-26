import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  color: ${props => props.color};
  width: ${props => props.width || props.theme.sizes.narrowColumn}px;
  height: ${props => props.height || '100%'};
  font-size: ${props => props.fontSize};
  background: ${props => props.background};
  padding: ${props => props.padding};
  flex: ${props => props.flex};
`;

export const Wrapper = ({ children, ...props }) => (
  <StyledWrapper {...props}>{children}</StyledWrapper>
);

Wrapper.propTypes = {
  children: PropTypes.node
};

export default Wrapper;
