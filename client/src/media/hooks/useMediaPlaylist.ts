import {useState, useEffect} from 'react';
import {useLocation} from 'react-exo/navigation';
import {hashToFiles} from 'app/utils/formatting';

export interface MediaPlaylist {
  focus: number,
  queue: Array<{
    name: string,
    ext: string,
    path: string,
    action: () => void,
  }>,
}

export function useMediaPlaylist(path: string): MediaPlaylist {
  const {hash} = useLocation();
  const [focus, setFocus] = useState(0);
  const [queue, setQueue] = useState<MediaPlaylist['queue']>([]);

  // Update playlist when hash or path changes
  useEffect(() => {
    if (!hash) return;
    const files = hashToFiles(hash);
    console.log('>> playlist update', path, hash, files)
    setFocus(files?.length - 1);
    setQueue(files?.map((name, index) => ({
      name,
      ext: name.split('.').pop() ?? '',
      path: name,
      action: () => setFocus(index),
    })) || []);
  }, [path, hash]);

  return {focus, queue};
}
