import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Trophy, Clock, User, Crown, Bot, Zap, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Position {
  row: number;
  col: number;
}

interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
  moveNumber: number;
}

const pieceSymbols: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
};

const initialBoard: (Piece | null)[][] = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

export function ChessPage() {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('white');
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [gameMode, setGameMode] = useState<'ai' | 'human'>('ai');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [gameStatus, setGameStatus] = useState<'playing' | 'checkmate' | 'stalemate'>('playing');

  const isValidMove = useCallback((from: Position, to: Position, piece: Piece): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    const targetPiece = board[to.row][to.col];

    // Can't capture own piece
    if (targetPiece && targetPiece.color === piece.color) return false;

    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Move forward
        if (to.col === from.col && !targetPiece) {
          if (to.row === from.row + direction) return true;
          if (from.row === startRow && to.row === from.row + 2 * direction && !board[from.row + direction][from.col]) return true;
        }
        
        // Capture diagonally
        if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction && targetPiece) return true;
        return false;

      case 'rook':
        if (from.row !== to.row && from.col !== to.col) return false;
        // Check path is clear
        const rDirRow = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
        const rDirCol = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
        let rRow = from.row + rDirRow;
        let rCol = from.col + rDirCol;
        while (rRow !== to.row || rCol !== to.col) {
          if (board[rRow][rCol]) return false;
          rRow += rDirRow;
          rCol += rDirCol;
        }
        return true;

      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

      case 'bishop':
        if (rowDiff !== colDiff) return false;
        // Check path is clear
        const bDirRow = to.row > from.row ? 1 : -1;
        const bDirCol = to.col > from.col ? 1 : -1;
        let bRow = from.row + bDirRow;
        let bCol = from.col + bDirCol;
        while (bRow !== to.row) {
          if (board[bRow][bCol]) return false;
          bRow += bDirRow;
          bCol += bDirCol;
        }
        return true;

      case 'queen':
        // Queen moves like rook or bishop
        if (from.row === to.row || from.col === to.col) {
          // Rook-like movement
          const qrDirRow = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
          const qrDirCol = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
          let qrRow = from.row + qrDirRow;
          let qrCol = from.col + qrDirCol;
          while (qrRow !== to.row || qrCol !== to.col) {
            if (board[qrRow][qrCol]) return false;
            qrRow += qrDirRow;
            qrCol += qrDirCol;
          }
          return true;
        }
        if (rowDiff === colDiff) {
          // Bishop-like movement
          const qbDirRow = to.row > from.row ? 1 : -1;
          const qbDirCol = to.col > from.col ? 1 : -1;
          let qbRow = from.row + qbDirRow;
          let qbCol = from.col + qbDirCol;
          while (qbRow !== to.row) {
            if (board[qbRow][qbCol]) return false;
            qbRow += qbDirRow;
            qbCol += qbDirCol;
          }
          return true;
        }
        return false;

      case 'king':
        return rowDiff <= 1 && colDiff <= 1;

      default:
        return false;
    }
  }, [board]);

  // Find king position for a given color
  const findKing = useCallback((board: (Piece | null)[][], color: PieceColor): Position | null => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.type === 'king' && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  }, []);

  // Check if a square is under attack by the opposing color (simplified, no recursion)
  const isSquareUnderAttack = useCallback((board: (Piece | null)[][], pos: Position, byColor: PieceColor): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === byColor) {
          const deltaRow = pos.row - row;
          const deltaCol = pos.col - col;
          
          switch (piece.type) {
            case 'pawn':
              const direction = piece.color === 'white' ? -1 : 1;
              if (deltaRow === direction && Math.abs(deltaCol) === 1) {
                return true;
              }
              break;
              
            case 'rook':
              if ((deltaRow === 0 || deltaCol === 0) && (deltaRow !== 0 || deltaCol !== 0)) {
                // Check if path is clear
                const stepRow = deltaRow === 0 ? 0 : deltaRow > 0 ? 1 : -1;
                const stepCol = deltaCol === 0 ? 0 : deltaCol > 0 ? 1 : -1;
                let pathClear = true;
                let checkRow = row + stepRow;
                let checkCol = col + stepCol;
                
                while (checkRow !== pos.row || checkCol !== pos.col) {
                  if (board[checkRow][checkCol] !== null) {
                    pathClear = false;
                    break;
                  }
                  checkRow += stepRow;
                  checkCol += stepCol;
                }
                
                if (pathClear) return true;
              }
              break;
              
            case 'bishop':
              if (Math.abs(deltaRow) === Math.abs(deltaCol) && deltaRow !== 0) {
                // Check if path is clear
                const stepRow = deltaRow > 0 ? 1 : -1;
                const stepCol = deltaCol > 0 ? 1 : -1;
                let pathClear = true;
                let checkRow = row + stepRow;
                let checkCol = col + stepCol;
                
                while (checkRow !== pos.row || checkCol !== pos.col) {
                  if (board[checkRow][checkCol] !== null) {
                    pathClear = false;
                    break;
                  }
                  checkRow += stepRow;
                  checkCol += stepCol;
                }
                
                if (pathClear) return true;
              }
              break;
              
            case 'queen':
              const isRookMove = (deltaRow === 0 || deltaCol === 0) && (deltaRow !== 0 || deltaCol !== 0);
              const isBishopMove = Math.abs(deltaRow) === Math.abs(deltaCol) && deltaRow !== 0;
              
              if (isRookMove || isBishopMove) {
                const stepRow = deltaRow === 0 ? 0 : deltaRow > 0 ? 1 : -1;
                const stepCol = deltaCol === 0 ? 0 : deltaCol > 0 ? 1 : -1;
                let pathClear = true;
                let checkRow = row + stepRow;
                let checkCol = col + stepCol;
                
                while (checkRow !== pos.row || checkCol !== pos.col) {
                  if (board[checkRow][checkCol] !== null) {
                    pathClear = false;
                    break;
                  }
                  checkRow += stepRow;
                  checkCol += stepCol;
                }
                
                if (pathClear) return true;
              }
              break;
              
            case 'knight':
              if ((Math.abs(deltaRow) === 2 && Math.abs(deltaCol) === 1) ||
                  (Math.abs(deltaRow) === 1 && Math.abs(deltaCol) === 2)) {
                return true;
              }
              break;
              
            case 'king':
              if (Math.abs(deltaRow) <= 1 && Math.abs(deltaCol) <= 1 && (deltaRow !== 0 || deltaCol !== 0)) {
                return true;
              }
              break;
          }
        }
      }
    }
    return false;
  }, []);

  // Check if a king is in check
  const isInCheck = useCallback((board: (Piece | null)[][], color: PieceColor): boolean => {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    
    const oppositeColor = color === 'white' ? 'black' : 'white';
    return isSquareUnderAttack(board, kingPos, oppositeColor);
  }, [findKing, isSquareUnderAttack]);

  // Check if a move would leave the king in check (illegal move)
  const wouldBeInCheck = useCallback((from: Position, to: Position, piece: Piece): boolean => {
    // Create a temporary board with the move applied
    const tempBoard = board.map(row => [...row]);
    tempBoard[to.row][to.col] = piece;
    tempBoard[from.row][from.col] = null;
    
    return isInCheck(tempBoard, piece.color);
  }, [board, isInCheck]);

  // Get all legal moves for a piece (moves that don't leave king in check)
  const getLegalMovesForPiece = useCallback((pos: Position): Position[] => {
    const piece = board[pos.row][pos.col];
    if (!piece) return [];

    const moves: Position[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(pos, { row, col }, piece)) {
          // Check if this move would leave the king in check
          if (!wouldBeInCheck(pos, { row, col }, piece)) {
            moves.push({ row, col });
          }
        }
      }
    }
    return moves;
  }, [board, isValidMove, wouldBeInCheck]);

  // Get all legal moves for a color (simplified to prevent recursion)
  const getAllLegalMoves = useCallback((board: (Piece | null)[][], color: PieceColor): Move[] => {
    const moves: Move[] = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.color === color) {
          // Get all possible moves for this piece
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              // Skip if same position
              if (row === toRow && col === toCol) continue;
              
              // Check if move is valid according to piece rules
              if (isValidMove({ row, col }, { row: toRow, col: toCol }, piece)) {
                // Create temporary board to test if move leaves king in check
                const tempBoard = board.map(r => [...r]);
                tempBoard[toRow][toCol] = piece;
                tempBoard[row][col] = null;
                
                // Find king position after move
                const kingPos = findKing(tempBoard, color);
                if (kingPos && !isSquareUnderAttack(tempBoard, kingPos, color === 'white' ? 'black' : 'white')) {
                  moves.push({
                    from: { row, col },
                    to: { row: toRow, col: toCol },
                    piece,
                    captured: board[toRow][toCol] || undefined,
                    moveNumber: 0 // This will be set properly when move is made
                  });
                }
              }
            }
          }
        }
      }
    }
    
    return moves;
  }, [isValidMove, findKing, isSquareUnderAttack]);

  // Check for checkmate or stalemate
  const getGameStatus = useCallback((board: (Piece | null)[][], color: PieceColor): 'playing' | 'checkmate' | 'stalemate' => {
    const legalMoves = getAllLegalMoves(board, color);
    
    if (legalMoves.length === 0) {
      if (isInCheck(board, color)) {
        return 'checkmate';
      } else {
        return 'stalemate';
      }
    }
    
    return 'playing';
  }, [getAllLegalMoves, isInCheck]);

  // AI Logic Functions
  const evaluateBoard = useCallback((board: (Piece | null)[][]): number => {
    const pieceValues = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9,
      king: 100
    };

    let score = 0;
    
    // Check for checkmate/stalemate
    const whiteStatus = getGameStatus(board, 'white');
    const blackStatus = getGameStatus(board, 'black');
    
    if (whiteStatus === 'checkmate') {
      return 1000; // AI wins
    }
    if (blackStatus === 'checkmate') {
      return -1000; // AI loses
    }
    if (whiteStatus === 'stalemate' || blackStatus === 'stalemate') {
      return 0; // Draw
    }
    
    // Material evaluation
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          const value = pieceValues[piece.type];
          if (piece.color === 'black') {
            score += value;
          } else {
            score -= value;
          }
        }
      }
    }
    
    // Bonus for having the enemy king in check
    if (isInCheck(board, 'white')) {
      score += 50;
    }
    if (isInCheck(board, 'black')) {
      score -= 50;
    }
    
    return score;
  }, [getGameStatus, isInCheck]);

  const minimax = useCallback((
    board: (Piece | null)[][],
    depth: number,
    isMaximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): { score: number; bestMove?: Move } => {
    // Check for terminal states first
    const currentColor = isMaximizing ? 'black' : 'white';
    const gameStatus = getGameStatus(board, currentColor);
    
    if (gameStatus === 'checkmate') {
      return { score: isMaximizing ? -1000 : 1000 };
    }
    if (gameStatus === 'stalemate') {
      return { score: 0 };
    }
    
    if (depth === 0) {
      return { score: evaluateBoard(board) };
    }

    const moves = getAllLegalMoves(board, currentColor);

    if (moves.length === 0) {
      // This shouldn't happen if getGameStatus is working correctly
      return { score: isMaximizing ? -1000 : 1000 };
    }

    let bestMove: Move | undefined;
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (const move of moves) {
      // Create new board with move applied
      const newBoard = board.map(row => [...row]);
      newBoard[move.to.row][move.to.col] = move.piece;
      newBoard[move.from.row][move.from.col] = null;

      // Add some randomness for lower difficulties
      let scoreModifier = 0;
      if (aiDifficulty === 'easy') {
        scoreModifier = (Math.random() - 0.5) * 4;
      } else if (aiDifficulty === 'medium') {
        scoreModifier = (Math.random() - 0.5) * 2;
      }

      const result = minimax(newBoard, depth - 1, !isMaximizing, alpha, beta);
      const score = result.score + scoreModifier;

      if (isMaximizing) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score);
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
        beta = Math.min(beta, score);
      }

      if (beta <= alpha) {
        break; // Alpha-beta pruning
      }
    }

    return { score: bestScore, bestMove };
  }, [evaluateBoard, getAllLegalMoves, aiDifficulty, getGameStatus]);

  const makeAIMove = useCallback(async () => {
    if (currentTurn !== 'black' || gameMode !== 'ai' || gameStatus !== 'playing') {
      setAiThinking(false);
      return;
    }

    setAiThinking(true);
    
    try {
      // Add thinking delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Get all legal moves for AI
      const legalMoves = getAllLegalMoves(board, 'black');
      
      if (legalMoves.length === 0) {
        // No legal moves - check for checkmate or stalemate
        const currentGameStatus = getGameStatus(board, 'black');
        setGameStatus(currentGameStatus);
        
        if (currentGameStatus === 'checkmate') {
          toast.success('Checkmate! You win!', {
            description: 'Congratulations!'
          });
        } else if (currentGameStatus === 'stalemate') {
          toast.info('Stalemate! The game is a draw.', {
            description: 'Good game!'
          });
        }
        setAiThinking(false);
        return;
      }

      let bestMove: Move;
      
      if (aiDifficulty === 'easy') {
        // Easy: Random move with slight preference for captures
        const captures = legalMoves.filter(move => move.captured);
        if (captures.length > 0 && Math.random() < 0.7) {
          bestMove = captures[Math.floor(Math.random() * captures.length)];
        } else {
          bestMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
        }
      } else {
        // Medium/Hard: Use minimax
        const depth = aiDifficulty === 'medium' ? 2 : 3;
        const result = minimax(board, depth, true);
        bestMove = result.bestMove || legalMoves[0]; // Fallback to first legal move
      }

      // Apply the move
      const newBoard = board.map(row => [...row]);
      const capturedPiece = newBoard[bestMove.to.row][bestMove.to.col];
      newBoard[bestMove.to.row][bestMove.to.col] = bestMove.piece;
      newBoard[bestMove.from.row][bestMove.from.col] = null;

      setBoard(newBoard);
      setMoveHistory(prev => [...prev, { ...bestMove, moveNumber: prev.length + 1 }]);
      
      // Check game status after AI move
      const playerInCheck = isInCheck(newBoard, 'white');
      const newGameStatus = getGameStatus(newBoard, 'white');
      
      setCurrentTurn('white');
      setGameStatus(newGameStatus);

      // Show appropriate message based on game state
      if (newGameStatus === 'checkmate') {
        toast.error('Checkmate! AI wins!', {
          description: 'Better luck next time!'
        });
      } else if (newGameStatus === 'stalemate') {
        toast.info('Stalemate! The game is a draw.', {
          description: 'Good game!'
        });
      } else if (playerInCheck) {
        toast.warning('Check! Your king is under attack!', {
          description: 'Find a way to protect your king'
        });
      } else if (capturedPiece) {
        toast.success(`AI captured your ${capturedPiece.type}!`, {
          description: 'The AI is getting stronger...'
        });
      } else {
        const aiMessages = [
          'AI makes a strategic move',
          'AI is planning something...',
          'Calculating next moves...',
          'AI adapts its strategy'
        ];
        toast.info(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
      }
    } catch (error) {
      console.error('AI move error:', error);
      toast.error('AI encountered an error. Switching turns.');
      setCurrentTurn('white');
    }

    setAiThinking(false);
  }, [board, currentTurn, gameMode, gameStatus, aiDifficulty, getAllLegalMoves, getGameStatus, minimax, isInCheck]);

  // Check game status whenever board changes
  useEffect(() => {
    const currentGameStatus = getGameStatus(board, currentTurn);
    if (currentGameStatus !== gameStatus) {
      setGameStatus(currentGameStatus);
    }
  }, [board, currentTurn, getGameStatus, gameStatus]);

  // Trigger AI move when it's AI's turn
  useEffect(() => {
    if (currentTurn === 'black' && gameMode === 'ai' && gameStatus === 'playing') {
      makeAIMove();
    }
  }, [currentTurn, gameMode, gameStatus, makeAIMove]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    // Prevent moves when AI is thinking, it's AI's turn, or game is over
    if (aiThinking || (gameMode === 'ai' && currentTurn === 'black') || gameStatus !== 'playing') {
      return;
    }

    const clickedPiece = board[row][col];

    if (selectedSquare) {
      const selectedPiece = board[selectedSquare.row][selectedSquare.col];
      
      if (selectedPiece && isValidMove(selectedSquare, { row, col }, selectedPiece)) {
        // Check if this move is legal (doesn't leave king in check)
        if (!wouldBeInCheck(selectedSquare, { row, col }, selectedPiece)) {
          // Make the move
          const newBoard = board.map(r => [...r]);
          const capturedPiece = newBoard[row][col];
          newBoard[row][col] = selectedPiece;
          newBoard[selectedSquare.row][selectedSquare.col] = null;

          const move: Move = {
            from: selectedSquare,
            to: { row, col },
            piece: selectedPiece,
            captured: capturedPiece || undefined,
            moveNumber: moveHistory.length + 1,
          };

          setBoard(newBoard);
          setMoveHistory([...moveHistory, move]);
          
          // Check if this move puts opponent in check
          const newTurn = currentTurn === 'white' ? 'black' : 'white';
          const opponentInCheck = isInCheck(newBoard, newTurn);
          const newGameStatus = getGameStatus(newBoard, newTurn);
          
          setCurrentTurn(newTurn);
          setSelectedSquare(null);
          setValidMoves([]);
          setGameStatus(newGameStatus);

          // Show appropriate message
          if (newGameStatus === 'checkmate') {
            toast.success(`Checkmate! ${currentTurn} wins!`, {
              description: 'Game Over'
            });
          } else if (newGameStatus === 'stalemate') {
            toast.info('Stalemate! The game is a draw.', {
              description: 'Game Over'
            });
          } else if (opponentInCheck) {
            toast.warning(`Check! ${newTurn} king is under attack.`);
          } else if (capturedPiece) {
            toast.success(`You captured ${capturedPiece.type}!`, {
              description: 'Great move!'
            });
          }
        } else {
          toast.error('Illegal move! This would leave your king in check.');
          setSelectedSquare(null);
          setValidMoves([]);
        }
      } else if (clickedPiece && clickedPiece.color === currentTurn) {
        // Select a different piece of the same color
        setSelectedSquare({ row, col });
        setValidMoves(getLegalMovesForPiece({ row, col }));
      } else {
        // Invalid move or clicked empty square
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      // Select a piece - only allow selecting your own pieces
      if (clickedPiece && clickedPiece.color === currentTurn) {
        if (gameMode === 'ai' && clickedPiece.color === 'black') {
          toast.error('AI controls the black pieces!');
          return;
        }
        setSelectedSquare({ row, col });
        setValidMoves(getLegalMovesForPiece({ row, col }));
      }
    }
  }, [board, selectedSquare, currentTurn, moveHistory, isValidMove, getLegalMovesForPiece, aiThinking, gameMode, gameStatus, wouldBeInCheck, isInCheck, getGameStatus]);

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
    setCurrentTurn('white');
    setMoveHistory([]);
    setValidMoves([]);
    setGameStatus('playing');
    setAiThinking(false);
    toast.success('New game started!');
  };

  const toggleGameMode = () => {
    const newMode = gameMode === 'ai' ? 'human' : 'ai';
    setGameMode(newMode);
    resetGame();
    toast.success(`Switched to ${newMode === 'ai' ? 'AI opponent' : 'human vs human'} mode`);
  };

  const changeDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    setAiDifficulty(difficulty);
    toast.success(`AI difficulty set to ${difficulty}`);
  };

  const isSquareHighlighted = (row: number, col: number): boolean => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const isSquareSelected = (row: number, col: number): boolean => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI-Powered Blockchain Chess
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Challenge our advanced AI opponent or play with friends. Every move is blockchain-verified with intelligent gameplay analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Chess Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              {/* Game Status */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    aiThinking 
                      ? 'bg-gradient-to-r from-accent to-secondary animate-pulse' 
                      : currentTurn === 'white' 
                        ? 'bg-gradient-to-r from-primary to-secondary' 
                        : 'bg-gradient-to-r from-secondary to-accent'
                  }`}>
                    {aiThinking ? (
                      <Bot className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Crown className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {gameStatus === 'checkmate' ? 'Game Over' : 
                       gameStatus === 'stalemate' ? 'Stalemate' :
                       isInCheck(board, currentTurn) ? 'Check!' :
                       aiThinking ? 'AI Thinking...' : 'Current Turn'}
                    </div>
                    <div className={`capitalize bg-gradient-to-r bg-clip-text text-transparent ${
                      gameStatus === 'checkmate' ? 'from-destructive to-accent' :
                      gameStatus === 'stalemate' ? 'from-muted-foreground to-muted-foreground' :
                      isInCheck(board, currentTurn) ? 'from-accent to-destructive' :
                      'from-primary to-secondary'
                    }`}>
                      {gameStatus === 'checkmate' ? `${currentTurn === 'white' ? 'Black' : 'White'} Wins!` :
                       gameStatus === 'stalemate' ? 'Draw' :
                       aiThinking ? 'Processing' : 
                       gameMode === 'ai' && currentTurn === 'black' ? 'AI (Black)' : currentTurn}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={toggleGameMode}
                      variant="outline"
                      className="border-accent/30 hover:border-accent/60 rounded-full"
                    >
                      {gameMode === 'ai' ? <Bot className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
                      {gameMode === 'ai' ? 'vs AI' : 'vs Human'}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={resetGame}
                      variant="outline"
                      className="border-primary/30 hover:border-primary/60 rounded-full"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Chess Board */}
              <div className="aspect-square w-full max-w-2xl mx-auto relative">
                {aiThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-accent/5 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center"
                  >
                    <div className="bg-card/80 backdrop-blur-md p-4 rounded-xl border border-accent/30">
                      <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6 text-accent animate-pulse" />
                        <span className="text-accent">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div className={`grid grid-cols-8 gap-0 w-full h-full rounded-2xl overflow-hidden border-2 ${aiThinking ? 'border-accent/50' : 'border-primary/30'} transition-colors`}>
                  {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                      const isLight = (rowIndex + colIndex) % 2 === 0;
                      const isSelected = isSquareSelected(rowIndex, colIndex);
                      const isHighlighted = isSquareHighlighted(rowIndex, colIndex);

                      return (
                        <motion.button
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleSquareClick(rowIndex, colIndex)}
                          className={`
                            relative aspect-square flex items-center justify-center text-4xl sm:text-5xl md:text-6xl
                            transition-all duration-200
                            ${isLight ? 'bg-muted/30' : 'bg-background/50'}
                            ${isSelected ? 'ring-4 ring-primary ring-inset' : ''}
                            ${isHighlighted ? 'ring-2 ring-accent ring-inset' : ''}
                            hover:brightness-110
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AnimatePresence mode="wait">
                            {piece && (
                              <motion.div
                                key={`piece-${rowIndex}-${colIndex}`}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className={`${piece.color === 'white' ? 'text-white drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-foreground drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]'}`}
                              >
                                {pieceSymbols[piece.color][piece.type]}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {isHighlighted && !piece && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 rounded-full bg-accent/50"
                            />
                          )}

                          {isHighlighted && piece && (
                            <div className="absolute inset-0 border-4 border-accent/50 rounded-lg" />
                          )}
                        </motion.button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Board Labels */}
              <div className="flex justify-between mt-4 px-2 text-sm text-muted-foreground">
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>E</span>
                <span>F</span>
                <span>G</span>
                <span>H</span>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* AI Settings */}
            {gameMode === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-6 p-6 bg-card/50 backdrop-blur-lg border border-accent/30 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Bot className="w-5 h-5 text-accent" />
                    </div>
                    <h3>AI Opponent</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Difficulty Level</div>
                      <div className="flex gap-2">
                        {(['easy', 'medium', 'hard'] as const).map((level) => (
                          <motion.button
                            key={level}
                            onClick={() => changeDifficulty(level)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${
                              aiDifficulty === level
                                ? 'bg-gradient-to-r from-accent to-secondary text-white'
                                : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    {aiThinking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20"
                      >
                        <Zap className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-sm text-accent">AI is calculating the best move...</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Game Info */}
            <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <h3 className="mb-4">Game Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Game Mode</span>
                  <Badge className={`${gameMode === 'ai' ? 'bg-gradient-to-r from-accent to-secondary' : 'bg-gradient-to-r from-primary to-secondary'}`}>
                    {gameMode === 'ai' ? 'vs AI' : 'vs Human'}
                  </Badge>
                </div>
                
                {/* Game Status Indicator */}
                {(gameStatus !== 'playing' || isInCheck(board, currentTurn)) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex items-center gap-2 p-3 rounded-xl border ${
                      gameStatus === 'checkmate' ? 'bg-destructive/10 border-destructive/30' :
                      gameStatus === 'stalemate' ? 'bg-muted/20 border-muted/40' :
                      'bg-accent/10 border-accent/30'
                    }`}
                  >
                    {gameStatus === 'checkmate' ? (
                      <Trophy className="w-4 h-4 text-destructive" />
                    ) : gameStatus === 'stalemate' ? (
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-accent" />
                    )}
                    <span className={`text-sm ${
                      gameStatus === 'checkmate' ? 'text-destructive' :
                      gameStatus === 'stalemate' ? 'text-muted-foreground' :
                      'text-accent'
                    }`}>
                      {gameStatus === 'checkmate' ? `${currentTurn === 'white' ? 'Black' : 'White'} wins by checkmate!` :
                       gameStatus === 'stalemate' ? 'Game drawn by stalemate' :
                       `${currentTurn} king is in check!`}
                    </span>
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Moves</span>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    {moveHistory.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">White Pieces</span>
                  <span>{board.flat().filter(p => p?.color === 'white').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Black Pieces</span>
                  <span>{board.flat().filter(p => p?.color === 'black').length}</span>
                </div>
              </div>
            </Card>

            {/* Move History */}
            <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <h3 className="mb-4">Move History</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {moveHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No moves yet
                  </p>
                ) : (
                  moveHistory.slice().reverse().map((move, index) => (
                    <motion.div
                      key={move.moveNumber}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50"
                    >
                      <Badge className="bg-gradient-to-r from-primary to-secondary shrink-0">
                        #{move.moveNumber}
                      </Badge>
                      <div className="flex-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {pieceSymbols[move.piece.color][move.piece.type]}
                          </span>
                          <span className="text-muted-foreground">
                            {String.fromCharCode(65 + move.from.col)}{8 - move.from.row} → {String.fromCharCode(65 + move.to.col)}{8 - move.to.row}
                          </span>
                        </div>
                        {move.captured && (
                          <div className="text-xs text-accent mt-1">
                            Captured {move.captured.type}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>

            {/* Game Stats */}
            <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <h3 className="mb-4">Blockchain Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Games Played</div>
                    <div>127</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Game Time</div>
                    <div>24 min</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">AI Win Rate</div>
                    <div>72%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Your Win Rate</div>
                    <div>68%</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(99, 102, 241, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--primary), var(--secondary));
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
