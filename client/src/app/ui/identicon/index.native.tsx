import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useMemo} from 'react';
import {bloSvg} from 'blo';

import {SIZE_DEFAULT} from './index.base';
import type {IdenticonProps} from './index.base';

export function Identicon(props: IdenticonProps) {
  const size = props.size ?? SIZE_DEFAULT;
  const svg = useMemo(() => props.id ? bloSvg(`0x${props.id}`) : '', [props.id]);
  return props.id ? (
    <View style={{
      width: size,
      height: size,
      borderRadius: 3,
      overflow: 'hidden',
    }}>
      <SvgXml
        xml={svg}
        width={size}
        height={size}
      />
    </View>
  ) : null;
}
