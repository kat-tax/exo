import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {Marker} from 'react-map-gl/maplibre';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerDeviceProps extends MarkerProps {
  online: boolean,
  isSelf: boolean,
  onClick?: () => void,
}

export function MarkerDevice({onClick, online, isSelf, ...props}: MarkerDeviceProps) {
  return (
    <Marker {...props}>
      <Motion.Pressable onPress={onClick}>
        <Motion.View
          initial={{scale: 1}}
          whileTap={{scale: 0.95}}
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', speed: 100}}>
          <Icon
            name="ph:map-pin"
            size={isSelf ? 48 : 36}
            uniProps={(theme) => ({
              color: online
                ? theme.colors.primary
                : theme.colors.mutedForeground
            })}
          />
        </Motion.View>
      </Motion.Pressable>
    </Marker>
  )
}
