import {useRoute, RouteProp} from '@react-navigation/native';
import {useMemo} from 'react';
import {toPath} from 'app/lib/formatting';
import type {RootStackParamList} from 'app/nav';

export function usePath(): ReturnType<typeof toPath> {
  const route = useRoute<RouteProp<RootStackParamList, 'MediaBrowseLocal'>>();
  const pathname = useMemo(() => {
    const params = route.params;
    return params?.path
      ? `/browse/local/${params.path}`
      : '/browse/local';
  }, [route.params]);
  return useMemo(() => toPath(pathname, true), [pathname]);
}
