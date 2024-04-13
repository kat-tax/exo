import {Image as ImageBase} from 'react-native';
import {thumbHashToDataURL} from 'thumbhash';

import type {ImageComponent, ImageProps} from './Image.interface';

/** A component that displays images with caching and thumbhash support */
export const Image: ImageComponent = (props: ImageProps) => {

  const imagePlaceholder = props.thumbhash && !props.showActivityIndicator
    ? thumbHashToDataURL(base64ToBytes(props.thumbhash))
    : undefined;

  const imageFailure = props.failureImage
    ? `data:image/gif;base64,${props.failureImage}`
    : undefined;

  const imageLoading = props.showActivityIndicator
    ? 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    : undefined;

  const cache = props.cachePolicy === 'discNoCacheControl'
    ? 'force-cache'
    : 'default';

  return (
    <ImageBase
      style={props.style}
      source={{
        uri: props.url,
        width: props.width,
        height: props.height,
        cache,
      }}
      defaultSource={{
        uri: props.showActivityIndicator
          ? imageLoading
          : imagePlaceholder,
        width: props.width,
        height: props.height,
        cache,
      }}
      loadingIndicatorSource={{
        uri: imageLoading,
        width: props.width,
        height: props.height,
        cache,
      }}
      // @ts-ignore Web only prop
      draggable={props.draggable}
      progressiveRenderingEnabled={props.progressiveLoadingEnabled}
      borderRadius={props.borderRadius}
      resizeMode={props.resizeMode}
      onLoad={event => {
        props.onSuccess?.({
          nativeEvent: {
            width: event.nativeEvent?.source?.width,
            height: event.nativeEvent?.source?.height,
            source: props.url,
          },
        });
      }}
      onError={event => {
        if (imageFailure)
          props.url = imageFailure
        props.onError?.({
          nativeEvent: {
            error: event.nativeEvent.error,
          },
        });
      }}
    />
  );
}

function base64ToBytes(base64: string) {
  const bin = atob(base64);
  const len = bin.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++)
    arr[i] = bin.charCodeAt(i);
  return arr;
}
