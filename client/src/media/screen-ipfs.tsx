import {Media} from 'media/stacks/media';
import {Screen} from 'app/ui/screen';

export default function ScreenIpfs({route}: ReactNavigation.ScreenProps<'MediaIpfs'>) {
  const {cid, filename} = route.params;
  const name = filename || '';
  const path = `ipfs://${cid}`;
  const url = `/ipfs/${cid}/${name}`;
  const ext = name.split('.').pop() || '';

  return (
    <Screen>
      <Media
        {...{name, ext, url, path}}
        close={() => null}
        embedded={false}
        standalone
        maximized
        vertical
      />
    </Screen>
  );
}
