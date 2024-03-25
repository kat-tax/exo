import {Image as ImageBase} from 'react-native';
import type {ImageComponent, ImageProps} from './Image.interface';

/** A component that displays images with caching, blurhash, and thumbhash support */
export const Image: ImageComponent = (props: ImageProps) => {
  return (
    <ImageBase
      style={props.style}
      source={{uri: props.url, cache: 'force-cache'}}
      resizeMode={props.resizeMode}
      onError={props.onError}
      onLoad={event => {
        props.onSuccess?.({
          nativeEvent: {
            width: event.nativeEvent?.source?.width,
            height: event.nativeEvent?.source?.height,
            source: props.url,
          },
        });
      }}
    />
  );
}
