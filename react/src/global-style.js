import { createGlobalStyle } from 'styled-components';
import OpenSans from 'OpenSans-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  html {
  @font-face {
    font-family: 'OpenSans';
    src: url(${OpenSans});
  }  
  font-family: OpenSans, sans-serif;
}
`;

export default GlobalStyle;
