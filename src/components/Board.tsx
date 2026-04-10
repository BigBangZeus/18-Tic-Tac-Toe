import styled from 'styled-components';
import Square from './Square';

interface BoardProps {
  squares: Array<string | null>;
  onClick: (i: number) => void;
  boardSize: number;
  level: number;
}

const BoardContainer = styled.div<{ boardSize: number, level: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.boardSize}, 60px);
  grid-template-rows: repeat(${props => props.boardSize}, 60px);
  gap: 3px;
  margin: 20px auto;
  background: rgba(20, 0, 20, 0.3);
  border-radius: 10px;
  padding: 10px;
  position: relative;
  box-shadow: 0 0 10px 3px rgba(180, 0, 0, 0.3), 0 0 20px 5px rgba(180, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    z-index: -1;
    box-shadow: inset 0 0 20px rgba(180, 0, 0, 0.1);
  }
`;

const Board: React.FC<BoardProps> = ({ squares, onClick, boardSize, level }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  const renderBoard = () => {
    const squareElements = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
      squareElements.push(renderSquare(i));
    }
    return squareElements;
  };

  return (
    <BoardContainer boardSize={boardSize} level={level}>
      {renderBoard()}
    </BoardContainer>
  );
};

export default Board;
