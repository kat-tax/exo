import {useState, useEffect} from 'react';
import {useLocation} from 'react-exo/navigation';

export function useCurrentResource() {
  const {pathname, hash} = useLocation();
  const [path, setPath] = useState(hash ? `${pathname}/${hash?.slice(1)}` : '');
  const [maximized, setMaximized] = useState(true);

  useEffect(() => {
    if (hash) {
      const _path = `${pathname}/${hash?.slice(1)}`;
      if (_path !== path) {
        setPath(_path);
      }
      setMaximized(true);
    } else {
      setMaximized(false);
    }
  }, [pathname, hash, path]);

  return {path, maximized, setPath, setMaximized};
}
