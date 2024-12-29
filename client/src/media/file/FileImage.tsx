import {View, ImageBackground} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {memo, useState, useImperativeHandle, forwardRef} from 'react';
//import {useImageResolution, ResumableZoom, getAspectRatioSize} from 'react-native-zoom-toolkit';

import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

export interface FileImage extends FileProps {
  name: string,
  extension: string,
}

export interface ImageRef {
  increase: () => void,
  decrease: () => void,
  reset: () => void,
}

export default memo(forwardRef((props: FileImage, ref: React.Ref<ImageRef>) => {
  const [scale, setScale] = useState(1);
  const {styles} = useStyles(stylesheet);
  const image = useFileData(props.path, 'dataUrl');

  // Gets the resolution of your image
  // const {isFetching, resolution} = useImageResolution({uri: image || ''});
  // if (isFetching || resolution === undefined) {
  //   return null;
  // }

  // // An utility function to get the size without compromising the aspect ratio
  // const imageSize = getAspectRatioSize({
  //   aspectRatio: resolution.width / resolution.height,
  //   width: 300,
  // });

  useImperativeHandle(ref, () => ({
    increase: () => {
      setScale(scale + 0.1);
    },
    decrease: () => {
      setScale(scale - 0.1);
    },
    reset: () => {
      setScale(1);
    },
  }));

  return image ? (
    <View style={[
      styles.root,
      props.maximized && styles.maximized,
    ]}>
      {/* <ResumableZoom maxScale={resolution}> */}
        <ImageBackground
          style={styles.image}
          source={{uri: image}}
          resizeMode={props.maximized ? 'contain' : 'cover'}
        />
      {/* </ResumableZoom> */}
    </View>
  ) : null;
}));

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  maximized: {
    margin: theme.display.space3,
  },
  image: {
    flex: 1,
    overflow: 'hidden',
  },
}));
