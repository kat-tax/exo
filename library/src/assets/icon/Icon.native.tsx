import {SvgXml} from 'react-native-svg';
import {iconToHTML, iconToSVG} from '@iconify/utils';

import type {IconComponent, IconProps} from './Icon.interface';
import type {FullExtendedIconifyIcon} from '@iconify/utils';

export type IconRuntimeProps = IconProps & {
  iconData: FullExtendedIconifyIcon,
  hasPlugin: boolean,
};

export const Icon: IconComponent = (props: IconProps) => {
  const $props = props as IconRuntimeProps;

  if (!$props?.hasPlugin)
    throw new Error('Iconify: the Babel plugin is not installed.\n\nFollow the documentation: https://exo.ult.dev/primitives/assets/icon');
  if (!$props.iconData)
    return null;

  const res = iconToSVG($props.iconData, {height: $props.size});
  const svg = {...res, body: iconToHTML(res.body, res.attributes)};

  if (!svg || !svg.body)
    return null;

  return (
    <SvgXml
      xml={svg.body}
      height={svg.attributes.height}
      width={svg.attributes.width}
      color={$props.color}
      {...$props}
    />
  );
}
