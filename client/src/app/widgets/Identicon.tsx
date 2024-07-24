import {useMemo} from 'react';
import {useNavigate} from 'react-exo/navigation';
import {Motion} from 'react-exo/motion';
import {blo} from 'blo';

import type {ImageProps} from 'react-native';

const defaultSize = 30;

interface IdenticonProps extends ImageProps {
  id?: string,
  link?: string,
}

export function Identicon(props: IdenticonProps) {
  const navigate = useNavigate();
  const height = props.height ?? defaultSize;
  const width = props.width ?? defaultSize;
  const uri = useMemo(() => props.id ? blo(`0x${props.id}`) : '', [props.id]);

  return props.id ? (
    <Motion.Pressable
      disabled={!props.link}
      onPress={() => props.link && navigate(props.link)}>
      <Motion.Image
        {...props}
        width={width}
        height={height}
        source={{uri}}
        style={{width, height, borderRadius: 3}}
        initial={{scale: 1}}
        whileTap={{scale: 0.95}}
        whileHover={props.link ? {scale: 1.1} : {}}
        transition={{type: 'spring', speed: 100}}
      />
    </Motion.Pressable>
  ) : null;
}
