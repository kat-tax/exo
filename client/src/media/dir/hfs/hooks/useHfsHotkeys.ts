import {useState, useEffect} from 'react';

export function useHfsHotkeys() {
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(false);
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return {
    multiSelect,
  };
}

