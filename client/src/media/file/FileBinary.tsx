import {t} from '@lingui/macro';
import {forwardRef} from 'react';
import {Linking} from 'react-native';
import {useLingui} from '@lingui/react';
import {useDataUrl} from 'media/hooks/useDataUrl';
import {Watermark} from 'media/stacks/Watermark';

import type {FileProps} from 'media/file';

interface FileBinary extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileBinary) => {
  const {i18n} = useLingui();
  const download = useDataUrl(props.path);
  return (
    <Watermark
      title={`${props.name}.${props.extension}`}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => {
        if (download) {
          Linking.openURL(download);
        }
      }}
    />
  );
});
