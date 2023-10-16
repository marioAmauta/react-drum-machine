import { useEffect, useState } from 'react';
import { setVolume } from '../lib/utils';

export function useVolume({ isPowerOff }) {
  const [currentVolume, setCurrentVolume] = useState(50);

  useEffect(() => {
    if (isPowerOff) {
      setVolume({ volume: 0 });
      return;
    }

    setVolume({ volume: currentVolume });
  }, [currentVolume, isPowerOff]);

  return {
    currentVolume,
    setCurrentVolume
  };
}
