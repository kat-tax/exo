import {Rive} from 'react-exo/rive';
import {forwardRef} from 'react';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {RiveRef} from 'react-exo/rive';

export interface FileRive extends FileProps {}

export type {RiveRef};

export default forwardRef((props: FileRive, ref: React.Ref<RiveRef>) => {
  const source = useFile(props.path, 'dataUrl');

  return source ? (
    <Rive
      ref={ref}
      url={source}
      style={{flex: 1}}
      resizeMode="contain"
      autoplay
    />
  ) : null;
});
