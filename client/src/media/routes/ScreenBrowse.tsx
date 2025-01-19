import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {useHfsStartup, HfsDir} from 'media/dir/hfs';
import {InitDirectory} from 'media/dir/hfs/utils/path';
import {Page} from 'app/interface/Page';

export default function ScreenBrowse() {
  const {name, base, path} = useLocationPathInfo();
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

  useHfsStartup();

  return (
    <Page
      fullWidth
      margin="small"
      title={title(name)}
      message={base ? title(base) : '/'}>
      <HfsDir {...{path}}/>
    </Page>
  );
}
