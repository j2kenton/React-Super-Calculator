import React from 'react';
import Body from 'sections/body';
import styled from 'styled-components';
import GlobalStyle from 'global-style';

const FullPage = styled.div`
  background-color: ${props => props.theme.colors.black};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MainSection = styled.main`
  width: ${props => props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px;
  @media (max-width: ${props =>
      props.theme.sizes.wideColumn + props.theme.sizes.narrowColumn * 2}px) {
    width: 100vw;
  }
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 5vh;
`;

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 25px;
  color: ${props => props.theme.colors.alternativeGrey};
`;

const StyledFooter = styled.footer`
  text-align: center;
  margin-top: 40px;
  color: ${props => props.theme.colors.alternativeGrey};
`;

function App() {
  return (
    <FullPage>
      <GlobalStyle />
      <MainSection>
        <StyledHeader>
          <h1>React Intuitive Calculator</h1>
        </StyledHeader>
        <Body />
        <StyledFooter>Made with love by Jonathan Kenton</StyledFooter>
      </MainSection>
    </FullPage>
  );
}

export default App;
