import React, { useEffect, useState } from 'react';

/**
 * ButtonTile
 * Props:
 *  - color: 'green' | 'red' | 'yellow' | 'blue'
 *  - index: 0..3
 *  - onPress(index)
 *  - disabled: bool
 *  - flashKey: when changed, the tile should flash (used when playing sequence)
 */
export default function ButtonTile({ color, index, onPress, disabled, flashKey }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (flashKey == null) return;
    // flash when flashKey corresponds to this index
    if (flashKey === index) {
      setIsActive(true);
      const t1 = setTimeout(() => setIsActive(false), 450);
      return () => clearTimeout(t1);
    }
  }, [flashKey, index]);

  const onClick = () => {
    if (disabled) return;
    // small visual press
    setIsActive(true);
    setTimeout(() => setIsActive(false), 120);
    onPress(index);
  };

  const baseClasses =
    'w-30 h-30 md:w-36 md:h-36 flex items-center justify-center rounded-2xl shadow-xl transition-transform duration-100';
  const activeClasses = isActive ? 'tile-glow scale-95 ring-4 ring-offset-2 ring-white/30' : '';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  // color mapping to Tailwind background / hover
  const colorMap = {
    green: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 hover:from-emerald-300',
    red: 'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-700 hover:from-rose-300',
    yellow: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-200',
    blue: 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700 hover:from-sky-300'
  };

  return (
    <button
      aria-label={`${color} tile`}
      onClick={onClick}
      className={`${baseClasses} ${colorMap[color] || ''} ${activeClasses} ${disabledClasses}`}
    />
  );
}