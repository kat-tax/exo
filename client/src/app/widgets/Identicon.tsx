import {blo} from 'blo';
import {Motion} from 'react-exo/motion';
import {useMemo, useState} from 'react';

import type {ImageProps} from 'react-native';

const defaultSize = 30;

export function Identicon(props: {id?: string} & ImageProps) {
  const [showQR, setShowQR] = useState(false);
  const height = props.height ?? defaultSize;
  const width = props.width ?? defaultSize;
  const uri = useMemo(() => props.id ? blo(`0x${props.id}`) : '', [props.id]);

  return props.id ? (
    <Motion.Pressable onPress={() => setShowQR(!showQR)}>
      <Motion.Image
        {...props}
        width={width}
        height={height}
        source={{uri}}
        style={{width, height, borderRadius: 3}}
        initial={{scale: 1}}
        whileTap={{scale: 0.95}}
        whileHover={{scale: 1.1}}
        transition={{type: 'spring', speed: 100}}
      />
    </Motion.Pressable>
  ) : null;
}
