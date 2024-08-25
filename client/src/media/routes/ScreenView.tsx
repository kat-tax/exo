import {useParams} from 'react-exo/navigation';
import {Media} from 'media/stacks/Media';

export default function ScreenView() {
  const {cid, filename} = useParams<{cid: string, filename: string}>();
  const name = filename || '';
  const path = `ipfs://${cid}`;
  const url = `/ipfs/${cid}/${name}`;
  const ext = name.split('.').pop() || '';
  return (
    <Media
      {...{name, ext, url, path}}
      close={() => null}
      maximized
      vertical
    />
  );
}
