import {Rive} from 'react-exo/rive';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {RiveRef} from 'react-exo/rive';

export interface FileRive extends FileProps {}

export type {RiveRef};

export default forwardRef((props: FileRive, ref: React.Ref<RiveRef>) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);

  return source ? (
    <Rive
      ref={ref}
      url={source}
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
