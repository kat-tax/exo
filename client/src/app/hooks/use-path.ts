import {useLocation} from 'react-exo/navigation';
import {useMemo} from 'react';
import {toPath} from 'app/utils/formatting';

export function usePath(): ReturnType<typeof toPath> {
  const {pathname} = useLocation();
  return useMemo(() => toPath(pathname, true), [pathname]);
}
