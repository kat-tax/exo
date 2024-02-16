import {FasterImageView as ImageBase} from '@candlefinance/faster-image';
import type {ImageProps} from './Image.props';

export function Image(props: ImageProps) {
  return (
    <ImageBase {...props}/>
  );
}
