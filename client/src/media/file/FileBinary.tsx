import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useEffect, forwardRef} from 'react';
import {useFileData} from 'media/hooks/useFileData';
import {Watermark} from 'media/stacks/Watermark';

import type {FileProps} from 'media/file';

export interface FileBinary extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileBinary) => {
  const {i18n} = useLingui();
  const binary = useFileData(props.path, 'dataUrl');

  const saveFile = async (uri: string) => {
    const link = document.createElement('a');
    link.download = props.name;
    link.href = uri;
    link.click();
  };

  // Update file player bar info
  useEffect(() => {
    if (!binary) return;
    props.setBarInfo(t(i18n)`Unknown`);
  }, [binary, i18n, props.setBarInfo]);

  return (
    <Watermark
      title={props.name}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => binary && saveFile(binary)}
    />
  );
});
