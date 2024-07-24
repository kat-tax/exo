import {Icon} from 'react-exo/icon';
import {Marker} from 'react-map-gl/maplibre';
import {useStyles} from 'react-native-unistyles';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerDeviceProps extends MarkerProps {
  online: 0 | 1,
  isSelf: boolean,
}

export function MarkerDevice(props: MarkerDeviceProps) {
  const {theme} = useStyles();
  return (
    <Marker {...props}>
      <Icon
        name="ph:map-pin"
        size={props.isSelf ? 32 : 24}
        color={props.online
          ? theme.colors.primary
          : theme.colors.secondary
        }
      />
    </Marker>
  )
}
