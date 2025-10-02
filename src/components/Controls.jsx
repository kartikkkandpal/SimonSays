import React from 'react';

export default function Controls({ onStart, onReset, isStarted, isGameOver, isPlaying, lastMoveCorrect }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={onStart}
          className="btn-glass px-6 py-2 bg-gradient-to-r from-green-500 via-green-700 to-black hover:from-green-400 hover:to-gray-900 rounded-xl shadow-lg text-white font-bold tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-pressed={isStarted}
        >
          {isStarted ? (isPlaying ? 'Playing...' : 'Continue') : 'Start'}
        </button>

        <button
          onClick={onReset}
          className="btn-glass px-6 py-2 bg-gradient-to-r from-gray-700 via-black to-gray-900 hover:from-gray-600 hover:to-black rounded-xl shadow-lg text-white font-semibold tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
      {(isGameOver || lastMoveCorrect === false) && (
        <div className="flex flex-col items-center w-full mt-1">
          <span className="text-red-400 font-semibold leading-tight">Wrong! Game Over</span>
          <span className="text-red-400 font-semibold leading-tight">Press Reset or Start to try again.</span>
        </div>
      )}
    </div>
  );
}