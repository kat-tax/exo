import {useParams} from 'react-exo/navigation';
import {CurrentFile} from 'media/stacks/CurrentFile';

export default function ScreenView() {
  const {cid, ext} = useParams<{cid: string, ext: string}>();
  return (
    <CurrentFile
      name={' '}
      ext={ext || ''}
      url={`https://ipfs.io/ipfs/${cid}`}
      path={`ipfs://${cid}`}
      vertical
      maximized
      close={() => null}
    />
  );
}
