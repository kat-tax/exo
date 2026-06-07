import {NavigationRoute} from '@react-navigation/native';
import {RootStackParamList} from 'app/nav';
import {SelectTabs} from 'media/stacks/select/tabs';
import {Media} from 'media/stacks/media';
import {Suspense} from 'app/ui/load';

interface PreviewProps {
  focused: string;
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>;
}

export function Preview({focused, activeRoute}: PreviewProps) {
  const path = getPathFromRoute(activeRoute);

  return (
    <>
      <SelectTabs routePath={path}/>
      <Suspense>
        <Media
          path={focused || path}
          vertical={false}
          maximized={true}
          embedded={false}
          close={() => {}}
        />
      </Suspense>
    </>
  );
}

function getPathFromRoute(route: NavigationRoute<RootStackParamList, keyof RootStackParamList>): string {
  if (route.name === 'MediaBrowseEvolu') {
    const params = route.params as RootStackParamList['MediaBrowseEvolu'];
    const deviceId = params.deviceId?.toString() || '';
    const pathId = params.pathId?.toString() || '';
    return pathId ? `evolu://${deviceId}/${pathId}` : `evolu://${deviceId}`;
  }

  if (route.name === 'MediaBrowseLocal') {
    const params = route.params as RootStackParamList['MediaBrowseLocal'];
    return params.path || '';
  }

  return '';
}
