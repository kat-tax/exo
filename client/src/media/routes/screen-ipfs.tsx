import {useParams} from 'react-exo/navigation';
import {Media} from 'media/stacks/media';
import {Panel} from 'app/stacks/panel';

export default function ScreenIpfs() {
  const {cid, filename} = useParams<{cid: string, filename: string}>();
  const name = filename || '';
  const path = `ipfs://${cid}`;
  const url = `/ipfs/${cid}/${name}`;
  const ext = name.split('.').pop() || '';
  return (
    <Panel
      fullWidth
      margin="none">
      <Media
        {...{name, ext, url, path}}
        close={() => null}
        embedded={false}
        maximized
        vertical
      />
    </Panel>
  );
}
