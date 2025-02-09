import {View, Image} from 'react-native';
import {Image as ExoImage} from 'react-exo/image';
import {useRef, useImperativeHandle, useEffect, useState, memo, forwardRef} from 'react';
import {getMatrixTransformStyles, TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
//import {useImageResolution, ResumableZoom, fitContainer} from 'react-native-zoom-toolkit';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {ReactZoomPanPinchContentRef} from 'react-zoom-pan-pinch';

export interface FileImage extends FileProps {}

export interface ImageRef {
  increase: () => void,
  decrease: () => void,
  reset: () => void,
}

export default memo(forwardRef((props: FileImage, ref: React.Ref<ImageRef>) => {
  const source = useFile(props.path, 'dataUrl');
  const controls = useRef<ReactZoomPanPinchContentRef>(null);
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

  // Update image dimensions
  useEffect(() => {
    if (!source || props.embedded) return;
    Image.getSize(source, (w, h) => {
      setWidth(w);
      setHeight(h);
    });
  }, [source, props.actions]);

  // Update file player bar info
  useEffect(() => {
    if (!source || props.embedded) return;
    props.actions.setInfo(`${width}x${height} (${Math.round(scale * 100)}%)`);
  }, [width, height, scale]);

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
      wheel={{smoothStep: 0.01}}
      onTransformed={({state}) => setScale(state.scale)}>
      {/* <ResumableZoom maxScale={resolution}> */}
      <TransformComponent
        contentStyle={{height: '100%', width: '100%'}}
        wrapperStyle={{height: '100%', width: '100%'}}>
        <View style={styles.root}>
          <ExoImage
            url={source}
            style={styles.image}
            resizeMode={props.maximized ? 'center' : 'cover'}
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
