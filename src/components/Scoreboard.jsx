import React from 'react';

export default function Scoreboard({ round }) {
  return (
    <div className="score-glass flex flex-col items-center">
      <div className="text-xs uppercase text-gray-300 tracking-widest">Round</div>
      <div className="text-5xl font-extrabold text-white drop-shadow">{round}</div>
    </div>
  );
}