import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {Marker} from 'react-map-gl/maplibre';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerGeoJsonProps extends MarkerProps {
  onClick?: () => void;
}

export function MarkerGeoJson({onClick, ...props}: MarkerGeoJsonProps) {
  return (
    <Marker {...props}>
      <Motion.Pressable onPress={onClick}>
        <Motion.View
          initial={{scale: 1}}
          whileTap={{scale: 0.95}}
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', speed: 100}}>
          <Icon
            name="ph:map-pin-simple"
            size={24}
            uniProps={(theme) => ({
              color: theme.colors.mutedForeground,
            })}
          />
        </Motion.View>
      </Motion.Pressable>
    </Marker>
  )
}
