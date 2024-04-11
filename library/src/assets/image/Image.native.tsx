import {FasterImageView as ImageBase} from '@candlefinance/faster-image';
import type {ImageComponent, ImageProps} from './Image.interface';

export const Image: ImageComponent = (props: ImageProps) => {
  return (
    <ImageBase
      onSuccess={props.onSuccess}
      onError={props.onError}
      style={{
        ...props.style,
        width: props.width,
        height: props.height,
      }}
      source={{
        url: props.url,
        thumbhash: props.thumbhash,
        failureImage: props.failureImage,
        showActivityIndicator: props.showActivityIndicator,
        progressiveLoadingEnabled: props.progressiveLoadingEnabled,
        transitionDuration: props.transitionDuration,
        borderRadius: props.borderRadius,
        cachePolicy: props.cachePolicy,
        resizeMode: props.resizeMode === 'stretch'
          ? 'fill'
          : props.resizeMode,
      }}
    />
  );
}
