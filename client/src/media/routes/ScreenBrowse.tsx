import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {InitDirectory} from 'media/dir/hfs/utils/path';
import {useHfs} from 'media/dir/hfs/hooks/useHfs';
import {HfsDir} from 'media/dir/hfs';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {name, base, path} = useLocationPathInfo();
  const {hfs, cmd, ext} = useHfs(path);
  const {t} = useLingui();

  const title = useCallback((name: string) => {
    const dir = name as InitDirectory;
    switch (dir) {
      case InitDirectory.Documents:
        return t`Documents`;
      case InitDirectory.Music:
        return t`Music`;
      case InitDirectory.Pictures:
        return t`Pictures`;
      case InitDirectory.Videos:
        return t`Videos`;
      case InitDirectory.Games:
        return t`Games`;
      case InitDirectory.Books:
        return t`Books`;
      case InitDirectory.Downloads:
        return t`Downloads`;
      case InitDirectory.Uploads:
        return t`Uploads`;
      default: dir satisfies never;
        return dir || t`Files`;
    }
  }, [t]);

  return (
    <Page
      fullWidth
      margin="small"
      // title={title(name)}
      // message={base ? title(base) : '/'}
    >
      <HfsDir {...{hfs, cmd, ext}}/>
    </Page>
  );
}
