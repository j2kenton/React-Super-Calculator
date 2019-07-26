import React from 'react';
import Body from 'sections/body';
import styled from 'styled-components';

const MainSection = styled.main`
  width: 600px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 5vh;
`;

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledFooter = styled.footer`
  text-align: center;
  margin-top: 20px;
`;

function App() {
  return (
    <MainSection>
      <StyledHeader>
        <h1>React Intuitive Calculator</h1>
      </StyledHeader>
      <Body />
      <StyledFooter>Made with love by Jonathan Kenton</StyledFooter>
    </MainSection>
  );
}

export default App;
