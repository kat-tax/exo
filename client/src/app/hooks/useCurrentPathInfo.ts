import {useMemo} from 'react';
import {useLocation} from 'react-exo/navigation';
import {toPathInfo} from 'app/utils/formatting';

export function useLocationPathInfo() {
  const {pathname} = useLocation();
  return useMemo(() => toPathInfo(pathname, true), [pathname]);
}
