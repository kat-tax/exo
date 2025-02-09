import {useEffect, forwardRef} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useFileData} from 'media/file/hooks/useFileData';
import {Watermark} from 'app/stacks/watermark';

import type {FileProps} from 'media/file';

export interface FileBinary extends FileProps {}

export default forwardRef((props: FileBinary) => {
  const source = useFileData(props.path, 'dataUrl');
  const {t} = useLingui();

  const saveFile = async (uri: string) => {
    const link = document.createElement('a');
    link.download = props.name;
    link.href = uri;
    link.click();
  };

  // Update file player bar info
  useEffect(() => {
    if (!source) return;
    props.actions.setInfo(t`Unsupported File`);
  }, [source, props.actions, t]);

  return (
    <Watermark
      title={t`This file can not be previewed.`}
      label={t`Download`}
      icon="ph:download"
      onAction={() => source && saveFile(source)}
    />
  );
});
