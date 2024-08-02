import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {Marker} from 'react-map-gl/maplibre';
import {useStyles} from 'react-native-unistyles';

import type {MarkerProps} from 'react-map-gl/maplibre';

interface MarkerSchoolProps extends MarkerProps {
  id: string,
  name: string,
  address: string,
}

export function MarkerSchool(props: MarkerSchoolProps) {
  const {theme} = useStyles();
  return (
    <Marker {...props}>
      <Motion.Pressable
        onPress={() => alert(`${props.name}\n${props.address}\n(branch: ${props.id})\n`)}>
        <Motion.View
          initial={{scale: 1}}
          whileTap={{scale: 0.95}}
          whileHover={{scale: 1.1}}
          transition={{type: 'spring', speed: 100}}>
          <Icon
            size={32}
            name="ph:map-pin"
            color={theme.colors.primary}
          />
        </Motion.View>
      </Motion.Pressable>
    </Marker>
  )
}
