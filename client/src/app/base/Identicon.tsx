import {blo} from 'blo';
import {useMemo} from 'react';
import {useOwner} from '@evolu/react-native';
import {Image, ImageProps} from 'react-native';

export function Identicon(props: ImageProps) {
  const owner = useOwner();
  const uri = useMemo(() => owner ? blo(`0x${owner?.id}`) : '', [owner]);
  const width = props.width ?? 30;
  const height = props.height ?? 30;

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
