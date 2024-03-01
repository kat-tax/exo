import {FasterImageView as ImageBase} from '@candlefinance/faster-image';
import type {ImageComponent, ImageProps} from './Image.interface';

export const Image: ImageComponent = (props: ImageProps) => {
  return (
    <ImageBase {...props}/>
  );
}
