import React, { useCallback, useMemo, useState } from 'react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import Scoreboard from './components/Scoreboard';
import useSimonGame from './hooks/useSimonGame';

/**
 * App: main game container
 */
export default function App() {
  const {
    round,
    isPlayingSequence,
    isGameOver,
    isStarted,
    startGame,
    resetGame,
    handleUserInput
  } = useSimonGame();

  const [lastMoveCorrect, setLastMoveCorrect] = useState(true);

  const onStart = useCallback(() => {
    startGame();
    setLastMoveCorrect(true);
  }, [startGame]);

  const onReset = useCallback(() => {
    resetGame();
    setLastMoveCorrect(true);
  }, [resetGame]);

  const onTilePress = useCallback(
    (index) => {
      const { accepted, correct } = handleUserInput(index);
      if (!accepted) return;
      setLastMoveCorrect(Boolean(correct));
    },
    [handleUserInput]
  );

  const statusText = useMemo(() => {
    if (isGameOver) return `Game Over — reached round ${round}`;
    if (!isStarted) return 'Press Start to play';
    if (isPlayingSequence) return `Watch the sequence — Round ${round}`;
    return `Your turn — Round ${round}`;
  }, [isGameOver, isStarted, isPlayingSequence, round]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-card max-w-4xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-white via-60% to-yellow-300 to-90% bg-clip-text text-transparent drop-shadow-lg">
            Simon Says
          </h1>
          <Scoreboard round={round} />

          <div className="mt-2 text-base text-gray-200 font-medium">{statusText}</div>

          <div className="mt-4">
            <Controls
              onStart={onStart}
              onReset={onReset}
              isStarted={isStarted}
              isGameOver={isGameOver}
              isPlaying={isPlayingSequence}
              lastMoveCorrect={lastMoveCorrect}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <GameBoard onTilePress={onTilePress} disabled={isPlayingSequence || isGameOver || !isStarted} />
        </div>
      </div>
    </div>
  );
}