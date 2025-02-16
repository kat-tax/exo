import {useMemo, useState} from 'react';
import {Motion} from 'react-exo/motion';
import {blo} from 'blo';

import type {ImageProps} from 'react-native';

const defaultSize = 30;

interface IdenticonProps extends ImageProps {
  id?: string,
  linkable?: boolean,
}

export function Identicon(props: IdenticonProps) {
  const [linkOpen, setLinkOpen] = useState(false);
  const height = props.height ?? defaultSize;
  const width = props.width ?? defaultSize;
  const uri = useMemo(() => props.id ? blo(`0x${props.id}`) : '', [props.id]);

  return props.id ? (
    <Motion.Pressable
      disabled={!props.linkable}
      onPress={() => props.linkable && setLinkOpen(true)}>
      <Motion.Image
        {...props}
        width={width}
        height={height}
        source={{uri}}
        style={{width, height, borderRadius: 3}}
        initial={{scale: 1}}
        whileTap={{scale: 0.95}}
        whileHover={props.linkable ? {scale: 1.1} : {}}
        transition={{type: 'spring', speed: 100}}
      />
      {linkOpen && null}
    </Motion.Pressable>
  ) : null;
}
