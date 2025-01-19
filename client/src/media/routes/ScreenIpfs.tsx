import {useParams} from 'react-exo/navigation';
import {Media} from 'media/stacks/Media';
import {Page} from 'app/interface/Page';

export default function ScreenIpfs() {
  const {cid, filename} = useParams<{cid: string, filename: string}>();
  const name = filename || '';
  const path = `ipfs://${cid}`;
  const url = `/ipfs/${cid}/${name}`;
  const ext = name.split('.').pop() || '';
  return (
    <Page
      fullWidth
      margin="none">
      <Media
        {...{name, ext, url, path}}
        close={() => null}
        maximized
        vertical
      />
    </Page>
  );
}
