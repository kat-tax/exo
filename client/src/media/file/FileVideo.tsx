import {Video} from 'react-exo/video';

import {forwardRef} from 'react';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

export interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export type {VideoRef};

export default forwardRef((props: FileVideo, ref: React.Ref<VideoRef>) => {
  const video = useFileData(props.path, 'dataUrl');

  return video ? (
    <Video
      ref={ref}
      title={props.name}
      thumbnails={''}
      source={{uri: video}}
    />
  ) : null;
});
