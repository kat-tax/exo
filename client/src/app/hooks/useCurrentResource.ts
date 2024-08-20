import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';

export function useCurrentResource() {
  const {pathname, hash} = useLocation();
  const filename = decodeURIComponent(hash?.slice(1).replace(/\+/g, ' ') ?? '');
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
