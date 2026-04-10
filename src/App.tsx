import { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import WebFont from 'webfontloader'
import Game from './components/Game'

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: 
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('/assets/images/graveyard.png') no-repeat center center fixed;
    background-size: cover;
    font-family: 'Creepster', cursive;
    color: #eeeeee;
    position: relative;
  }
  
  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(76, 0, 130, 0.2), rgba(0, 0, 0, 0));
    z-index: 1;
    pointer-events: none;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .typewriter {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    animation-delay: 0.3s;
  }
  
  .typewriter span {
    display: inline-block;
    opacity: 0;
    animation: fadeIn 0.1s forwards;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  position: relative;
  z-index: 10;
`;

function App() {
  // Load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nosifer', 'Creepster']
      }
    });
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <Game />
    </AppContainer>
  );
}

export default App

/*
Build Instructions:
1. npm install - Install dependencies
2. npm run dev - Start development server
3. npm run build - Build for production
4. npm run preview - Preview production build
5. npm run deploy - Deploy to Vercel
*/
