import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {Marker} from 'react-map-gl/maplibre';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerDeviceProps extends MarkerProps {
  online: boolean,
  isSelf: boolean,
}

export function MarkerDevice(props: MarkerDeviceProps) {
  return (
    <Marker {...props}>
      <Motion.Pressable onPress={console.log}>
        <Motion.View
          initial={{scale: 1}}
          whileTap={{scale: 0.95}}
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', speed: 100}}>
          <Icon
            name="ph:map-pin"
            size={props.isSelf ? 32 : 24}
            uniProps={(theme) => ({
              color: props.online
                ? theme.colors.primary
                : theme.colors.mutedForeground
            })}
          />
        </Motion.View>
      </Motion.Pressable>
    </Marker>
  )
}
