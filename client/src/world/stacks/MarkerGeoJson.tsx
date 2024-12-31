import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {Marker} from 'react-map-gl/maplibre';
import {useStyles} from 'react-native-unistyles';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerGeoJsonProps extends MarkerProps {

}

export function MarkerGeoJson(props: MarkerGeoJsonProps) {
  const {theme} = useStyles();
  return (
    <Marker {...props}>
      <Motion.Pressable onPress={console.log}>
        <Motion.View
          initial={{scale: 1}}
          whileTap={{scale: 0.95}}
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', speed: 100}}>
          <Icon
            name="ph:map-pin-simple"
            color={theme.colors.mutedForeground}
            size={24}
          />
        </Motion.View>
      </Motion.Pressable>
    </Marker>
  )
}
