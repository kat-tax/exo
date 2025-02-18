import {useMemo} from 'react';
import {Image} from 'react-native';
import {blo} from 'blo';

import type {ImageProps} from 'react-native';

const defaultSize = 30;

interface IdenticonProps extends ImageProps {id?: string}

export function Identicon(props: IdenticonProps) {
  const height = props.height ?? defaultSize;
  const width = props.width ?? defaultSize;
  const uri = useMemo(() => props.id ? blo(`0x${props.id}`) : '', [props.id]);

  return props.id ? (
    <Image
      {...props}
      width={width}
      height={height}
      source={{uri}}
      style={{width, height, borderRadius: 3}}
    />
  ) : null;
}
