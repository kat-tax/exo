import {Text} from 'react-native';
import {useLocation} from 'react-exo/navigation';
import {PreviewPDF} from 'media/files/base/PreviewPDF';
import {resolve} from 'media/files/utils/path';
import {Page} from 'app/base/Page';

export default function ScreenFilePreview() {
  const {pathname} = useLocation();
  const path = resolve(pathname);
  const base = path.slice(0, -1).join('/') || '/';
  const name = path[path.length - 1];
  const ext = name?.split('.').pop();

  let viewer: React.ReactNode;
  switch (ext) {
    case 'pdf':
      viewer = (
        <PreviewPDF path={path.join('/')}/>
      );
      break;
    default:
      viewer = (
        <Text>Unsupported file type</Text>
      );
  }

  return (
    <Page title={name} message={base ?? '/'} fullWidth>
      {viewer}
    </Page>
  );
}
