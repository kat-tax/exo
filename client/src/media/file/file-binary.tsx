import {useImperativeHandle, useEffect, forwardRef} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useFile} from 'media/file/hooks/use-file';
import {Watermark} from 'app/stacks/watermark';

import type {FileProps} from 'media/file';

export interface FileBinary extends FileProps {}

export default forwardRef((
  {path, name, actions}: FileBinary,
  ref: React.Ref<unknown>,
) => {
  const source = useFile(path, 'dataUrl');
  const {t} = useLingui();

  const saveFile = async (uri: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
  };

  useImperativeHandle(ref, () => ({
    saveFile,
  }));

  useEffect(() => {
    if (!source) return;
    actions.setInfo(t`Unsupported File`);
  }, [source, actions, t]);

  return (
    <Watermark
      title={t`This file can not be previewed.`}
      label={t`Download`}
      icon="ph:download"
      onAction={() => source && saveFile(source)}
    />
  );
});
