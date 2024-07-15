import {blo} from 'blo';
import {useMemo} from 'react';
import {useOwner} from '@evolu/react-native';
import {Image, type ImageProps} from 'react-native';

const defaultSize = 30;

export function Identicon(props: ImageProps) {
  const height = props.height ?? defaultSize;
  const width = props.width ?? defaultSize;
  const owner = useOwner();
  const uri = useMemo(() => owner ? blo(`0x${owner?.id}`) : '', [owner]);

  return owner ? (
    <Image
      {...props}
      source={{uri}}
      width={width}
      height={height}
      style={{width, height, borderRadius: 3}}
    />
  ) : null;
}
