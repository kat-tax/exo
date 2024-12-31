import {useLingui} from '@lingui/react/macro';
import {useLocation} from 'react-exo/navigation';
import {useAppContext} from 'app/hooks/useAppContext';
import {useInitializer} from 'media/hooks/useInitializer';
import {resolve} from 'media/utils/path';
import {DirHfs} from 'media/dir/DirHfs';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {layout} = useAppContext();
  const {t} = useLingui();

  const parts = resolve(pathname);
  const name = parts[parts.length - 1] || t`Files`;
  const base = parts.slice(1, -1).join('/') || '/';

  useInitializer();

  return (
    <Page
      fullWidth
      margin="small"
      title={name}
      message={base ?? '/'}
      hasPanel={layout.hasPreviewPanel}>
      <DirHfs path={parts.join('/')}/>
    </Page>
  );
}
