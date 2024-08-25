import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useLocation} from 'react-exo/navigation';
import {useAppContext} from 'app/hooks/useAppContext';
import {useInitializer} from 'media/hooks/useInitializer';
import {resolve} from 'media/utils/path';
import {Page} from 'app/interface/Page';

import Directory from 'media/dir';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {layout} = useAppContext();
  const {i18n} = useLingui();
  const parts = resolve(pathname);
  const name = parts[parts.length - 1] || t(i18n)`Files`;
  const base = parts.slice(1, -1).join('/') || '/';

  useInitializer();

  return (
    <Page
      fullWidth
      title={name}
      message={base ?? '/'}
      hasPanel={layout.hasPreviewPanel}>
      <Directory path={parts.join('/')}/>
    </Page>
  );
}
