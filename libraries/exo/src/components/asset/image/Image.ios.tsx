import {FasterImageView as ImageBase} from '@candlefinance/faster-image';
import type {ImageProps} from './Image.interface';

export function Image(props: ImageProps) {
  return (
    <ImageBase {...props}/>
  );
}
