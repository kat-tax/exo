import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLocation} from 'react-exo/navigation';
import {useAppContext} from 'app/hooks/useAppContext';
import {useInitializer} from 'media/hooks/useInitializer';
import {InitDirectory} from 'media/utils/path';
import {resolve} from 'media/utils/path';
import {DirHfs} from 'media/dir/DirHfs';
import {Page} from 'app/interface/Page';


export default function ScreenBrowse() {
  const {pathname} = useLocation();
  const {layout} = useAppContext();
  const {t} = useLingui();

  const [name, path] = useMemo(() => {
    const parts = resolve(pathname);
    const name = parts[parts.length - 1] as InitDirectory;
    const path = parts.slice(1, -1).join('/') || '/';
    switch (name) {
      case InitDirectory.Documents:
        return [t`Documents`, path];
      case InitDirectory.Music:
        return [t`Music`, path];
      case InitDirectory.Pictures:
        return [t`Pictures`, path];
      case InitDirectory.Videos:
        return [t`Videos`, path];
      case InitDirectory.Games:
        return [t`Games`, path];
      case InitDirectory.Books:
        return [t`Books`, path];
      case InitDirectory.Downloads:
        return [t`Downloads`, path];
      case InitDirectory.Uploads:
        return [t`Uploads`, path];
      default: name satisfies never;
    }
    return [name ?? t`Files`, path];
  }, [pathname, t]);

  useInitializer();

  return (
    <Page
      fullWidth
      margin="small"
      title={name}
      message={path}
      hasPanel={layout.hasPreviewPanel}>
      <DirHfs {...{path}}/>
    </Page>
  );
}
