import {Media} from 'media/stacks/media';
import {Panel} from 'app/ui/panel';

export default function ScreenIpfs({route}: ReactNavigation.ScreenProps<'MediaIpfs'>) {
  const {cid, filename} = route.params;
  const name = filename || '';
  const path = `ipfs://${cid}`;
  const url = `/ipfs/${cid}/${name}`;
  const ext = name.split('.').pop() || '';
  return (
    <Panel>
      <Media
        {...{name, ext, url, path}}
        close={() => null}
        embedded={false}
        standalone
        maximized
        vertical
      />
    </Panel>
  );
}
