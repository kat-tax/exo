import {useState, useEffect} from 'react';
import {useLocation} from 'react-exo/navigation';
import {hashToFiles} from 'app/utils/formatting';

export interface MediaSelection {
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
  const {hash} = useLocation();
  const [focus, setFocus] = useState(0);
  const [queue, setQueue] = useState<MediaSelection['queue']>([]);

  // Update selection when hash or path changes
  useEffect(() => {
    if (!hash) return;
    const files = hashToFiles(hash);
    console.log('>> playlist update', path, hash, files)
    setFocus(files?.length - 1);
    setQueue(files?.map((name, index) => ({
      name,
      title: name.split('.').slice(0, -1).join('.'),
      ext: name.split('.').pop() ?? '',
      path: name,
      action: () => setFocus(index),
    })) || []);
  }, [path, hash]);

  return {focus, queue};
}
