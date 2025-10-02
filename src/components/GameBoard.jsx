import React, { useEffect, useState } from 'react';
import ButtonTile from './ButtonTile';

/**
 * GameBoard displays 4 tiles in a 2x2 grid.
 * It listens to window 'simon-play-tile' custom events emitted by the game hook to flash tiles.
 */
export default function GameBoard({ onTilePress, disabled }) {
  const [flashIndex, setFlashIndex] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      const tile = e.detail?.tile;
      setFlashIndex(tile);
      // Clear after the tile's flash duration
      setTimeout(() => setFlashIndex(null), 600);
    };
    window.addEventListener('simon-play-tile', handler);
    return () => window.removeEventListener('simon-play-tile', handler);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      <ButtonTile color="green" index={0} onPress={onTilePress} disabled={disabled} flashKey={flashIndex} />
      <ButtonTile color="red" index={1} onPress={onTilePress} disabled={disabled} flashKey={flashIndex} />
      <ButtonTile color="yellow" index={2} onPress={onTilePress} disabled={disabled} flashKey={flashIndex} />
      <ButtonTile color="blue" index={3} onPress={onTilePress} disabled={disabled} flashKey={flashIndex} />
    </div>
  );
}