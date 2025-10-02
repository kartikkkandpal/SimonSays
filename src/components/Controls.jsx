import React from 'react';

export default function Controls({ onStart, onReset, isStarted, isGameOver, isPlaying }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onStart}
        className="btn-glass px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg shadow text-white font-semibold"
        aria-pressed={isStarted}
      >
        {isStarted ? (isPlaying ? 'Playing...' : 'Continue') : 'Start'}
      </button>

      <button
        onClick={onReset}
        className="btn-glass px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg shadow text-white font-medium"
      >
        Reset
      </button>

      {isGameOver && <div className="ml-2 text-red-400 font-semibold">Wrong! Game Over</div>}
    </div>
  );
}