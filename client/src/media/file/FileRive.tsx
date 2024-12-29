import {Rive} from 'react-exo/rive';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {RiveRef} from 'react-exo/rive';

export interface FileRive extends FileProps {
  name: string,
  extension: string,
}

export type {RiveRef};

export default forwardRef((props: FileRive, ref: React.Ref<RiveRef>) => {
  const {styles} = useStyles(stylesheet);
  const rive = useFileData(props.path, 'dataUrl');

  return rive ? (
    <Rive
      ref={ref}
      url={rive}
      resizeMode="contain"
      autoplay
      style={[
        styles.root,
        props.maximized && styles.maximized,
      ]}
    />
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    margin: theme.display.space3,
  },
}));
