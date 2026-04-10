import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Howl } from 'howler';
import Board from './Board';

const floatUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px #990000) drop-shadow(0 0 20px #660000);
  }
  50% {
    filter: drop-shadow(0 0 15px #ff0000) drop-shadow(0 0 25px #990000);
  }
`;

const blinkCursor = keyframes`
  from, to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const Header = styled.h1`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 10px #990000, 0 0 20px #660000, 0 0 30px #330000;
  font-size: 3rem;
  margin-bottom: 5px;
`;

const HumanImage = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 25px;
  margin-top: 5px;
  animation: 
    ${floatUpDown} 3s ease-in-out infinite,
    ${glowPulse} 4s ease-in-out infinite;
  opacity: 1;
  transform-origin: center;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 5px;
`;

const SubHeader = styled.h2`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 8px #990000, 0 0 15px #660000;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const ModeSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const ModeButton = styled.button`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 10px #990000, 0 0 20px #660000;
  font-size: 1.8rem;
  padding: 15px 40px;
  width: 280px;
  background: rgba(20, 0, 20, 0.5);
  border: 2px solid rgba(180, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(180, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(40, 0, 40, 0.7);
    box-shadow: 0 0 15px rgba(180, 0, 0, 0.5);
    transform: translateY(-3px) scale(1.03);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const ResetButton = styled.button`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 10px #990000, 0 0 20px #660000;
  font-size: 1.5rem;
  margin-top: 20px;
  padding: 10px 30px;
  background: rgba(20, 0, 20, 0.5);
  border: 2px solid rgba(180, 0, 0, 0.5);
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(180, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(40, 0, 40, 0.7);
    box-shadow: 0 0 15px rgba(180, 0, 0, 0.5);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const MessageContainer = styled.div`
  margin: 20px auto;
  padding: 15px;
  max-width: 500px;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const TypewriterText = styled.div`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 8px #990000, 0 0 15px #660000;
  font-size: 1.4rem;
  white-space: normal;
  margin: 0 auto;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '|';
    position: absolute;
    right: -10px;
    color: #ff0000;
    animation: ${blinkCursor} 0.75s step-end infinite;
  }
`;

const Ghost = styled.div`
  position: absolute;
  width: 50px;
  height: 70px;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50% 50% 0 0;
  opacity: 0.5;
  z-index: -1;
`;

const Ghost1 = styled(Ghost)`
  top: 20%;
  left: 10%;
`;

const Ghost2 = styled(Ghost)`
  top: 60%;
  right: 15%;
`;

const Tombstone = styled.div`
  position: absolute;
  width: 40px;
  height: 60px;
  background: linear-gradient(to bottom, #666666, #444444);
  border-radius: 20px 20px 0 0;
  bottom: 0;
  z-index: -2;
  
  &::before {
    content: 'RIP';
    position: absolute;
    color: #333;
    font-size: 10px;
    top: 20px;
    width: 100%;
    text-align: center;
  }
`;

const Tombstone1 = styled(Tombstone)`
  left: 30%;
`;

const Tombstone2 = styled(Tombstone)`
  right: 25%;
`;

const LevelIndicator = styled.h2`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 8px #990000, 0 0 15px #660000;
  font-size: 3rem;
  margin-bottom: 30px;
  text-align: center;
  animation: ${floatUpDown} 3s ease-in-out infinite;
`;

const StatusText = styled.h2`
  font-family: 'Creepster', cursive;
  color: #eeeeee;
  text-shadow: 0 0 8px #990000, 0 0 15px #660000;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

// Typewriter Effect Component
const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  return (
    <TypewriterText className="typewriter">
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ 
            animationDelay: `${index * 0.05}s`,
            whiteSpace: char === ' ' ? 'pre' : 'normal' // Preserve spaces
          }}
        >
          {char}
        </span>
      ))}
    </TypewriterText>
  );
};

// Game modes
enum GameMode {
  None = 'none',
  AI = 'ai',
  TwoPlayer = 'two-player'
}

// Game states
enum GameState {
  SelectMode = 'select-mode',
  ShowMessage = 'show-message',
  Playing = 'playing'
}

// Funny AI messages
const AI_MESSAGES = [
  "Ha! You ain't got no friends?",
  "Prepare to lose to a ghost in the machine!",
  "I see dead people... and they're better at this game than you!",
  "Your social skills must be as dead as this graveyard!",
  "Let me guess, your friends are all 'ghosting' you?",
  "I was programmed to win, you were programmed to be alone!"
];

// Funny friend messages
const FRIEND_MESSAGES = [
  "Wow, you actually have a friend?",
  "Two players, one brain cell!",
  "Pass the device like a hot potato!",
  "Friendship ends when Tic-Tac-Toe begins!",
  "May the worst player be haunted forever!",
  "Sharing is caring... except victories!"
];

const Game: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.None);
  const [gameState, setGameState] = useState<GameState>(GameState.SelectMode);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [friendMessage, setFriendMessage] = useState<string>("");
  const [level, setLevel] = useState<number>(1);
  const [boardSize, setBoardSize] = useState<number>(level + 2);
  const [squares, setSquares] = useState<Array<string | null>>(Array(boardSize * boardSize).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [isTie, setIsTie] = useState<boolean>(false);

  // Sound effect for winning - use ref to avoid recreating on every render
  const booSoundRef = useRef<Howl | null>(null);
  useEffect(() => {
    booSoundRef.current = new Howl({
      src: ['/assets/sounds/boo.mp3'],
      volume: 0.7,
      onloaderror: () => {
        console.warn('Could not load boo.mp3 sound effect');
      },
    });
    return () => {
      booSoundRef.current?.stop();
      booSoundRef.current = null;
    };
  }, []);

  // Reset the board when level changes
  useEffect(() => {
    const newBoardSize = level + 2;
    setBoardSize(newBoardSize);
    setSquares(Array(newBoardSize * newBoardSize).fill(null));
    setXIsNext(true);
  }, [level]);

  // AI move logic
  useEffect(() => {
    if (gameMode === GameMode.AI && !xIsNext && gameState === GameState.Playing) {
      // Add a small delay to make it feel more natural
      const aiTimer = setTimeout(() => {
        makeSmartAIMove();
      }, 700);
      
      return () => clearTimeout(aiTimer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xIsNext, gameMode, gameState, squares, boardSize]);

  // Show game after message timer
  useEffect(() => {
    if (gameState === GameState.ShowMessage) {
      const messageTimer = setTimeout(() => {
        setGameState(GameState.Playing);
      }, 4000); // Show message for 4 seconds
      
      return () => clearTimeout(messageTimer);
    }
  }, [gameState]);

  // Smarter AI move logic
  const makeSmartAIMove = useCallback(() => {
    const winner = calculateWinner(squares);
    if (winner) return;
    
    const newSquares = [...squares];
    
    // 1. Check if AI can win in the next move
    const aiWinMove = findWinningMove(newSquares, 'O');
    if (aiWinMove !== -1) {
      handleClick(aiWinMove);
      return;
    }
    
    // 2. Block player's winning move
    const playerWinMove = findWinningMove(newSquares, 'X');
    if (playerWinMove !== -1) {
      handleClick(playerWinMove);
      return;
    }
    
    // 3. Try to take the center if it's available
    const centerIndex = Math.floor(boardSize * boardSize / 2);
    if (newSquares[centerIndex] === null) {
      handleClick(centerIndex);
      return;
    }
    
    // 4. Try to take a corner
    const corners = [
      0,                    // top-left
      boardSize - 1,        // top-right
      boardSize * (boardSize - 1), // bottom-left
      boardSize * boardSize - 1    // bottom-right
    ];
    
    const emptyCorners = corners.filter(corner => newSquares[corner] === null);
    if (emptyCorners.length > 0) {
      const randomCorner = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
      handleClick(randomCorner);
      return;
    }
    
    // 5. Take any available square
    const emptySquares = newSquares.map((square, index) => 
      square === null ? index : null
    ).filter(index => index !== null) as number[];
    
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      handleClick(emptySquares[randomIndex]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares, boardSize]);
  
  // Helper function to find winning move
  const findWinningMove = (squares: Array<string | null>, player: string): number => {
    // Check all possible lines
    const lines: number[][] = [];
    
    // Rows
    for (let row = 0; row < boardSize; row++) {
      const rowIndices = [];
      for (let col = 0; col < boardSize; col++) {
        rowIndices.push(row * boardSize + col);
      }
      lines.push(rowIndices);
    }
    
    // Columns
    for (let col = 0; col < boardSize; col++) {
      const colIndices = [];
      for (let row = 0; row < boardSize; row++) {
        colIndices.push(row * boardSize + col);
      }
      lines.push(colIndices);
    }
    
    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * boardSize + i);
      diagonal2.push(i * boardSize + (boardSize - 1 - i));
    }
    lines.push(diagonal1);
    lines.push(diagonal2);
    
    // Check each line for a potential winning move
    for (const line of lines) {
      let playerCount = 0;
      let emptyIndex = -1;
      
      for (let i = 0; i < line.length; i++) {
        if (squares[line[i]] === player) {
          playerCount++;
        } else if (squares[line[i]] === null) {
          emptyIndex = line[i];
        }
      }
      
      // If there's only one empty square and the rest are filled with the player's symbol
      if (playerCount === boardSize - 1 && emptyIndex !== -1) {
        return emptyIndex;
      }
    }
    
    return -1;
  };

  // Calculate winner based on dynamic board size
  const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines: number[][] = [];
    
    // Rows
    for (let row = 0; row < boardSize; row++) {
      const rowIndices = [];
      for (let col = 0; col < boardSize; col++) {
        rowIndices.push(row * boardSize + col);
      }
      lines.push(rowIndices);
    }
    
    // Columns
    for (let col = 0; col < boardSize; col++) {
      const colIndices = [];
      for (let row = 0; row < boardSize; row++) {
        colIndices.push(row * boardSize + col);
      }
      lines.push(colIndices);
    }
    
    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * boardSize + i);
      diagonal2.push(i * boardSize + (boardSize - 1 - i));
    }
    lines.push(diagonal1);
    lines.push(diagonal2);
    
    for (const line of lines) {
      const firstSquare = squares[line[0]];
      if (!firstSquare) continue;
      
      let isWinningLine = true;
      for (let i = 1; i < line.length; i++) {
        if (squares[line[i]] !== firstSquare) {
          isWinningLine = false;
          break;
        }
      }
      
      if (isWinningLine) return firstSquare;
    }
    
    return null;
  };

  const handleClick = (i: number) => {
    // If there's a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i] || gameState !== GameState.Playing) {
      return;
    }
    
    // Create a copy of the squares array
    const newSquares = squares.slice();
    
    // Place X or O in the clicked square
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    
    // Toggle player turn
    setXIsNext(!xIsNext);
    
    // Check for winner after the move
    const winner = calculateWinner(newSquares);
    if (winner) {
      // Play sound effect
      try {
        booSoundRef.current?.play();
      } catch {
        // Ignore audio playback errors
      }
      
      // Wait 1 second, then level up
      setTimeout(() => {
        setLevel(prevLevel => prevLevel + 1);
      }, 1000);
    } else {
      // Check for tie (all squares filled)
      const tieGame = newSquares.every(square => square !== null);
      if (tieGame) {
        // Set tie status
        setIsTie(true);
        
        // Wait 1 second, then restart the current level
        setTimeout(() => {
          // Reset the board but keep the same level
          setSquares(Array(boardSize * boardSize).fill(null));
          setXIsNext(true);
          setIsTie(false);
        }, 1500);
      }
    }
  };

  // Handle reset button click
  const handleReset = () => {
    setLevel(1);
    setGameMode(GameMode.None);
    setGameState(GameState.SelectMode);
    // The useEffect above will handle resetting the board
  };

  // Handle game mode selection
  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    setLevel(1);
    
    if (mode === GameMode.AI) {
      // Select a random funny message
      const randomIndex = Math.floor(Math.random() * AI_MESSAGES.length);
      setAiMessage(AI_MESSAGES[randomIndex]);
      setGameState(GameState.ShowMessage);
    } else if (mode === GameMode.TwoPlayer) {
      // Select a random funny message for friend mode
      const randomIndex = Math.floor(Math.random() * FRIEND_MESSAGES.length);
      setFriendMessage(FRIEND_MESSAGES[randomIndex]);
      setGameState(GameState.ShowMessage);
    } else {
      setGameState(GameState.Playing);
    }
  };

  // Render game mode selection screen
  const renderModeSelection = () => {
    return (
      <>
        <Header>Zooted T-T-T</Header>
        <ImageContainer>
          <HumanImage src="/assets/images/human.png" alt="Human" />
        </ImageContainer>
        <SubHeader>Choose Your Opponent</SubHeader>
        <ModeSelectionContainer>
          <ModeButton onClick={() => selectGameMode(GameMode.AI)}>
            Play Against AI
          </ModeButton>
          <ModeButton onClick={() => selectGameMode(GameMode.TwoPlayer)}>
            Play With Friend
          </ModeButton>
        </ModeSelectionContainer>
      </>
    );
  };

  // Render AI message
  const renderAIMessage = () => {
    return (
      <>
        <Header>Zooted T-T-T</Header>
        <MessageContainer>
          <TypewriterEffect text={aiMessage} />
        </MessageContainer>
      </>
    );
  };

  // Render Friend message
  const renderFriendMessage = () => {
    return (
      <>
        <Header>Zooted T-T-T</Header>
        <MessageContainer>
          <TypewriterEffect text={friendMessage} />
        </MessageContainer>
      </>
    );
  };

  // Render game board
  const renderGame = () => {
    const winner = calculateWinner(squares);
    let status;
    
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (isTie) {
      status = "It's a tie! Restarting...";
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    
    return (
      <>
        <LevelIndicator>LEVEL {level}</LevelIndicator>
        <StatusText>{status}</StatusText>
        <Board
          squares={squares}
          onClick={handleClick}
          boardSize={boardSize}
          level={level}
        />
        <ResetButton onClick={handleReset}>RESET GAME</ResetButton>
      </>
    );
  };

  // Render based on game state
  const renderContent = () => {
    switch (gameState) {
      case GameState.SelectMode:
        return renderModeSelection();
      case GameState.ShowMessage:
        if (gameMode === GameMode.AI) {
          return renderAIMessage();
        } else if (gameMode === GameMode.TwoPlayer) {
          return renderFriendMessage();
        }
        return renderGame();
      case GameState.Playing:
        return renderGame();
      default:
        return renderModeSelection();
    }
  };

  return (
    <GameContainer>
      <Ghost1 />
      <Ghost2 />
      <Tombstone1 />
      <Tombstone2 />
      {renderContent()}
    </GameContainer>
  );
};

export default Game;
