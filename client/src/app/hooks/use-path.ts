import {useMemo} from 'react';
import {useLocation} from 'react-exo/navigation';
import {toPathInfo} from 'app/utils/formatting';

export function usePath(): ReturnType<typeof toPathInfo> {
  const {pathname} = useLocation();
  return useMemo(() => toPathInfo(pathname, true), [pathname]);
}
