import {memo, useImperativeHandle, forwardRef, useEffect} from 'react';
import {useWindowDimensions, View, ImageBackground} from 'react-native';
//import {useImageResolution, ResumableZoom, fitContainer} from 'react-native-zoom-toolkit';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

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
  const image = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);
  // const {width, height} = useWindowDimensions();
  // const {isFetching, resolution} = useImageResolution({uri: image || ''});
  // if (isFetching || resolution === undefined) return null;

  // const size = fitContainer(resolution.width / resolution.height, {
  //   width,
  //   height,
  // });

  useImperativeHandle(ref, () => ({
    increase: () => {
      // setScale(scale + 0.1);
    },
    decrease: () => {
      // setScale(scale - 0.1);
    },
    reset: () => {
      // setScale(1);
    },
  }));

  // Update file player bar info
  useEffect(() => {
    if (!image) return;
    props.setBarInfo(`${1920} x ${1080}`);
  }, [image, props.setBarInfo]);

  return image ? (
    <View style={styles.root}>
      {/* <ResumableZoom maxScale={resolution}> */}
        <ImageBackground
          style={styles.image}
          // style={{...size}}
          source={{uri: image}}
          resizeMode={props.maximized ? 'contain' : 'cover'}
        />
      {/* </ResumableZoom> */}
    </View>
  ) : null;
}));

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    overflow: 'hidden',
  },
}));
