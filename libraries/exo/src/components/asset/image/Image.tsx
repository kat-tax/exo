import {Image as ImageBase} from 'react-native';
import type {ImageProps} from './Image.props';

export function Image(props: ImageProps) {
  return (
    <ImageBase
      style={props.style}
      source={{uri: props.url, cache: 'force-cache'}}
      resizeMode={props.resizeMode}
      onError={props.onError}
      onLoad={event => {
        const {width, height} = event.nativeEvent.source;
        props.onSuccess?.({
          nativeEvent: {width, height, source: props.url},
        });
      }}
    />
  );
}
