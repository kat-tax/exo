import {Image as ExoImage} from 'react-exo/image';
import {View, ImageBackground, Image} from 'react-native';
import {useRef, useImperativeHandle, useEffect, memo, forwardRef} from 'react';
import {getMatrixTransformStyles, TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
//import {useImageResolution, ResumableZoom, fitContainer} from 'react-native-zoom-toolkit';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {ReactZoomPanPinchContentRef} from 'react-zoom-pan-pinch';

export interface FileImage extends FileProps {}

export interface ImageRef {
  increase: () => void,
  decrease: () => void,
  reset: () => void,
}

export default memo(forwardRef((props: FileImage, ref: React.Ref<ImageRef>) => {
  const source = useFileData(props.path, 'dataUrl');
  const controls = useRef<ReactZoomPanPinchContentRef>(null);
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
      controls.current?.zoomIn();
    },
    decrease: () => {
      controls.current?.zoomOut();
    },
    reset: () => {
      controls.current?.resetTransform();
    },
  }));

  // Update file player bar info
  useEffect(() => {
    if (!source || props.embedded) return;
    Image.getSize(source, (width, height) => {
      props.actions.setInfo(`${width} x ${height}`);
    }, () => {
      props.actions.setInfo('‎');
    });
  }, [source, props.actions]);

  if (props.embedded) {
    return source ? (
      <View style={styles.root}>
        <ExoImage
          url={source}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    ) : null;
  }

  return source ? (
    <TransformWrapper
      smooth
      ref={controls}
      customTransform={getMatrixTransformStyles}
      doubleClick={{mode: 'reset'}}
      wheel={{smoothStep: 0.01}}>
      {/* <ResumableZoom maxScale={resolution}> */}
      <TransformComponent
        contentStyle={{height: '100%', width: '100%'}}
        wrapperStyle={{height: '100%', width: '100%'}}>
        <View style={styles.root}>
          <ExoImage
            url={source}
            style={styles.image}
            // style={{...size}}
            resizeMode={props.maximized ? 'contain' : 'cover'}
          />
        </View>
      </TransformComponent>
      {/* </ResumableZoom> */}
    </TransformWrapper>
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
