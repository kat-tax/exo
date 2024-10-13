import {useEffect} from 'react';

export interface Hotkeys {
  toggleMenu: () => void;
  togglePreview: () => void;
}

export function useHotkeys(hotkeys: Hotkeys) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const {key} = e;
      switch (key) {
        case '[':
          e.preventDefault();
          hotkeys.toggleMenu();
          break;
        case ']':
          e.preventDefault();
          hotkeys.togglePreview();
          break;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [hotkeys]);
}
