import {useLocation} from 'react-exo/navigation';
import {resolve} from 'media/files/utils/path';
import {Page} from 'app/base/Page';

export default function ScreenFilePreview() {
  const {pathname} = useLocation();
  const path = resolve(pathname);
  const name = path.pop();
  const dir = path.length ? path.join('/') : '/';
  return (
    <Page title={name} message={dir}>
    </Page>
  );
}
