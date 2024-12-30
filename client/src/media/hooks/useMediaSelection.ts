import {useState, useEffect, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {hashToFiles, filesToHash} from 'app/utils/formatting';

export interface MediaSelection {
  remove: (index: number) => void,
  focus: number,
  queue: Array<{
    name: string,
    title: string,
    ext: string,
    path: string,
    action: () => void,
  }>,
}

export function useMediaSelection(path: string): MediaSelection {
  const navigate = useNavigate();
  const {hash} = useLocation();
  const [focus, setFocus] = useState(0);
  const [queue, setQueue] = useState<MediaSelection['queue']>([]);

  // Update queue when hash or path changes
  useEffect(() => {
    if (!hash) return;
    const files = hashToFiles(hash);
    console.log('>> selection update', path, hash, files);
    setQueue((prev) => {
      // Update focus if new file is added
      if (files.length > prev.length) {
        setFocus(files.length - 1);
      }
      const newQueue = files?.map((name, index) => ({
        name,
        title: name.split('.').slice(0, -1).join('.'),
        ext: name.split('.').pop() ?? '',
        path: name,
        action: () => setFocus(index),
      })) || [];
      return newQueue;
    });
  }, [path, hash]);

  const remove = useCallback((index: number) => {
    const files = queue.filter((_, i) => i !== index);
    navigate(`${filesToHash(files.map(({name}) => name))}`);
    // Update focus if out of bounds
    if (focus >= files.length) {
      setFocus(files.length - 1);
    }
  }, [queue, focus, navigate]);

  return {focus, queue, remove};
}
