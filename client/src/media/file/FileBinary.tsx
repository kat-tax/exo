import {t} from '@lingui/macro';
import {forwardRef} from 'react';
import {useLingui} from '@lingui/react';
import {Watermark} from 'media/stacks/Watermark';

import type {FileProps} from 'media/file';

interface FileBinary extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileBinary) => {
  const {i18n} = useLingui();
  return (
    <Watermark
      title={`${props.name}.${props.extension}`}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => {
        console.log('Download', props.path);
      }}
    />
  );
});
