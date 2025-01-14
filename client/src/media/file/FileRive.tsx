import {Rive} from 'react-exo/rive';

import {forwardRef} from 'react';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {RiveRef} from 'react-exo/rive';

export interface FileRive extends FileProps {}

export type {RiveRef};

export default forwardRef((props: FileRive, ref: React.Ref<RiveRef>) => {
  const source = useFileData(props.path, 'dataUrl');

  return source ? (
    <Rive
      ref={ref}
      url={source}
      resizeMode="contain"
      autoplay
    />
  ) : null;
});
