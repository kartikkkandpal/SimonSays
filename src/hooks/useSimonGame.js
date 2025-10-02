import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useSimonGame
 * Manages game state: sequence, player input, playback, scores.
 *
 * Exposes:
 *  - sequence, round, isPlayingSequence, isGameOver, isStrict
 *  - startGame(), resetGame(), handleUserInput(tileIndex)
 *
 * Tiles are indices: 0=green,1=red,2=yellow,3=blue
 */
export default function useSimonGame() {
  const [sequence, setSequence] = useState([]);
  const [round, setRound] = useState(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const clickAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);

  // Load audio
  useEffect(() => {
    clickAudioRef.current = new Audio('/click.mp3');
    wrongAudioRef.current = new Audio('/wrong.mp3');
    // small volume clamp (optional)
    if (clickAudioRef.current) clickAudioRef.current.volume = 0.7;
    if (wrongAudioRef.current) wrongAudioRef.current.volume = 0.9;
  }, []);

  const playClick = useCallback(() => {
    const a = clickAudioRef.current;
    if (!a) return;
    // restart sound
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  }, []);

  const playWrong = useCallback(() => {
    const a = wrongAudioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  }, []);

  // Helpers
  const randomTile = useCallback(() => Math.floor(Math.random() * 4), []);

  // Add a step to the sequence
  const addStep = useCallback(() => {
    setSequence((s) => {
      const next = [...s, randomTile()];
      return next;
    });
  }, [randomTile]);

  // Start game
  const startGame = useCallback(() => {
    setSequence([]);
    setRound(0);
    setIsGameOver(false);
    setIsStarted(true);
    // next tick: add step
    setTimeout(() => {
      addStep();
    }, 200);
  }, [addStep]);

  // When sequence changes, begin playback
  useEffect(() => {
    if (!isStarted) return;
    if (sequence.length === 0) {
      // initial step was added asynchronously — do nothing yet
      return;
    }
    setRound(sequence.length);
    setPlayerIndex(0);
    setIsPlayingSequence(true);
  }, [sequence, isStarted]);

  // Play sequence to user
  const playbackTimeoutRef = useRef(null);
  useEffect(() => {
    if (!isPlayingSequence) return;

    let i = 0;
    const playNext = () => {
      if (i >= sequence.length) {
        setIsPlayingSequence(false);
        return;
      }
      // notify consumers via window event (or callbacks). We'll provide a callback in returned API by using a ref:
      const tile = sequence[i];
      // dispatch a custom browser event so UI components can flash
      const ev = new CustomEvent('simon-play-tile', { detail: { tile } });
      window.dispatchEvent(ev);

      // play sound
      playClick();

      i += 1;
      playbackTimeoutRef.current = setTimeout(() => {
        // small gap then next
        playbackTimeoutRef.current = setTimeout(playNext, 300);
      }, 600);
    };

    // start after a short delay
    playbackTimeoutRef.current = setTimeout(playNext, 500);

    return () => {
      if (playbackTimeoutRef.current) clearTimeout(playbackTimeoutRef.current);
    };
  }, [isPlayingSequence, sequence, playClick]);

  // Handle user's tile press
  const handleUserInput = useCallback(
    (tileIndex) => {
      if (isPlayingSequence || !isStarted || isGameOver) return { accepted: false };

      // play click sound for feedback
      playClick();

      // check sequence
      const expected = sequence[playerIndex];
      if (tileIndex === expected) {
        // correct
        const nextPlayerIndex = playerIndex + 1;
        setPlayerIndex(nextPlayerIndex);
        // if completed the sequence, add step and play it
        if (nextPlayerIndex >= sequence.length) {
          // completed round successfully
          setTimeout(() => {
            addStep();
          }, 700);
        }
        return { accepted: true, correct: true };
      } else {
        // wrong answer
        playWrong();
        setIsGameOver(true);
        setIsStarted(false);
        return { accepted: true, correct: false };
      }
    },
    [isPlayingSequence, isStarted, isGameOver, sequence, playerIndex, playClick, playWrong, addStep]
  );

  const resetGame = useCallback(() => {
    setSequence([]);
    setRound(0);
    setPlayerIndex(0);
    setIsPlayingSequence(false);
    setIsGameOver(false);
    setIsStarted(false);
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  }, []);

  return {
    sequence,
    round,
    isPlayingSequence,
    isGameOver,
    isStarted,
    startGame,
    resetGame,
    handleUserInput
  };
}