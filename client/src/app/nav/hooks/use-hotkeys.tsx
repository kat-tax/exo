import {useEffect} from 'react';
import {useSet} from 'app/data';
import media from 'media/store';

export interface Hotkeys {
  toggleMenu: () => void;
  togglePreview: () => void;
}

export function useHotkeys(hotkeys: Hotkeys) {
  const set = useSet();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const {key} = e;
      switch (key) {
        // Toggle main menu
        case '[':
          hotkeys.toggleMenu();
          break;
        // Toggle preview
        case ']':
          hotkeys.togglePreview();
          break;
        // Select all
        case 'a':
          if (!(e.metaKey || e.ctrlKey)) return;
          e.preventDefault();
          set(media.actions.selectBulk('main'));
          break;
        // Clear selection
        case 'Escape':
          set(media.actions.selectBulk([]));
          break;
      }
    };
    window.addEventListener('keydown', down);
    return () => {
      window.removeEventListener('keydown', down);
    };
  }, [hotkeys, set]);
}
