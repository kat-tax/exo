import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {hashToFiles} from 'app/utils/formatting';

export function useCurrentResource() {
  const {pathname, hash} = useLocation();
  const filename = hashToFiles(hash)?.pop();
  const [path, setPath] = useState(hash ? `${pathname}/${filename}` : '');
  const [maximized, setMaximized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const _path = `${pathname}/${filename}`;
      if (_path !== path) {
        setPath(_path);
      }
      setMaximized(true);
    } else {
      setMaximized(false);
    }
  }, [pathname, hash, path, filename]);

  const close = () => {
    setMaximized(false);
    setPath('');
    navigate(pathname);
  };

  return {path, maximized, close};
}
