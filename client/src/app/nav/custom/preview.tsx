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
  return (
    <>
      <SelectTabs/>
      <Suspense>
        <Media
          path={focused || activeRoute.path || ''}
          vertical={false}
          maximized={true}
          embedded={false}
          close={() => {}}
        />
      </Suspense>
    </>
  );
}
