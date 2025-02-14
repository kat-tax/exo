import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {InitDirectory} from 'media/dir/utils/hfs/path';

export function useMediaName(name?: string) {
  const {t} = useLingui();
  const title = useCallback((n?: string) => {
    const dir = n as InitDirectory;
    switch (dir) {
      case InitDirectory.Transfers:
        return t`Transfers`;
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
      default: dir satisfies never;
        return dir || t`Files`;
    }
  }, [t]);
  return title(name);
}
