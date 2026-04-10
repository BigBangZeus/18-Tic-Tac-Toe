import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const appearEffect = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const snakeCrawl = keyframes`
  0% {
    border-color: rgba(255, 0, 0, 0.3);
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
  }
  33% {
    border-color: rgba(128, 0, 128, 0.3);
    box-shadow: 0 0 5px rgba(128, 0, 128, 0.2);
  }
  66% {
    border-color: rgba(219, 112, 147, 0.3);
    box-shadow: 0 0 5px rgba(219, 112, 147, 0.2);
  }
  100% {
    border-color: rgba(255, 0, 0, 0.3);
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
  }
`;

const StyledButton = styled.button`
  background: rgba(20, 20, 30, 0.6);
  border: 2px solid rgba(255, 0, 0, 0.3);
  float: left;
  font-family: 'Nosifer', cursive;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 34px;
  height: 60px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 60px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
  animation: ${snakeCrawl} 4s infinite linear;
  animation-delay: calc(var(--square-index, 0) * 0.3s);
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    background: rgba(40, 40, 60, 0.7);
    box-shadow: 0 0 8px 2px rgba(255, 0, 0, 0.3);
  }
  
  .X {
    color: #990000;
    text-shadow: 0 0 8px #ff0000, 0 0 12px #ff6666;
    display: block;
    animation: ${appearEffect} 0.5s ease-out;
  }
  
  .O {
    color: #eeeeee;
    text-shadow: 0 0 6px #ffffff, 0 0 10px #aaaaff;
    display: block;
    animation: ${appearEffect} 0.5s ease-out;
  }
`;

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  const squareIndex = useMemo(() => Math.floor(Math.random() * 10), []);

  return (
    <StyledButton 
      className="square" 
      onClick={onClick}
      style={{ '--square-index': squareIndex } as React.CSSProperties}
    >
      {value && <span className={value}>{value}</span>}
    </StyledButton>
  );
};

export default Square;
