import {useRoute, RouteProp} from '@react-navigation/native';
import {useMemo} from 'react';
import {toPath} from 'app/lib/formatting';
import type {RootStackParamList} from 'app/nav';

export function usePath(): ReturnType<typeof toPath> {
  const route = useRoute<RouteProp<RootStackParamList, 'MediaBrowse'>>();
  const pathname = useMemo(() => {
    // Construct pathname from route params
    const params = route.params;
    if (params?.path) {
      return `/browse/${params.backend || 'local'}/${params.path}`;
    }
    if (params?.backend) {
      return `/browse/${params.backend}`;
    }
    // Fallback to route name-based path
    return '/browse/local';
  }, [route.params]);
  return useMemo(() => toPath(pathname, true), [pathname]);
}
