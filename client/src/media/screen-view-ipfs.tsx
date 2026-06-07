import {Media} from 'media/stacks/media';
import {Screen} from 'app/ui/screen';

export default function ScreenIpfs({route}: ReactNavigation.ScreenProps<'MediaViewIpfs'>) {
  const {cid, filename} = route.params;
  const path = `ipfs://${cid}/${filename}`;
  return (
    <Screen>
      <Media
        path={path}
        close={() => null}
        embedded={false}
        maximized
        vertical
      />
    </Screen>
  );
}
