import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLocation} from 'react-exo/navigation';
import {useAppContext} from 'app/hooks/useAppContext';
import {useHfsStartup, HfsDir} from 'media/dir/hfs';
import {InitDirectory} from 'media/dir/hfs/utils/path';
import {resolve} from 'media/dir/hfs/utils/path';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {layout} = useAppContext();
  const {t} = useLingui();

  const [name, path, base] = useMemo(() => {
    const parts = resolve(pathname);
    const name = parts[parts.length - 1] as InitDirectory;
    const base = parts.slice(1, -1).join('/') || '/';
    const path = parts.join('/');
    switch (name) {
      case InitDirectory.Documents:
        return [t`Documents`, path, base];
      case InitDirectory.Music:
        return [t`Music`, path, base];
      case InitDirectory.Pictures:
        return [t`Pictures`, path, base];
      case InitDirectory.Videos:
        return [t`Videos`, path, base];
      case InitDirectory.Games:
        return [t`Games`, path, base];
      case InitDirectory.Books:
        return [t`Books`, path, base];
      case InitDirectory.Downloads:
        return [t`Downloads`, path, base];
      case InitDirectory.Uploads:
        return [t`Uploads`, path, base];
      default: name satisfies never;
        return [name || t`Files`, path, base];
    }
  }, [pathname, t]);

  useHfsStartup();

  return (
    <Page
      fullWidth
      margin="small"
      title={name}
      message={base}
      hasPanel={layout.hasPreviewPanel}>
      <HfsDir {...{path}}/>
    </Page>
  );
}
