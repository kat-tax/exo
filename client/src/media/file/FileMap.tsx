import Map from 'react-map-gl/maplibre';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';

interface FileMap extends FileProps {
  name: string,
  extension: string,
}

const MAPTILER_URL = 'https://api.maptiler.com/maps/';
const MAPTILER_KEY = 'UbdBChbHpiVOSIdTJWvV';

export default forwardRef((props: FileMap) => {
  const {styles} = useStyles(stylesheet);
  const [scheme] = useScheme();
  const map = useFileData(props.path, 'dataUrl');
  const mapId = scheme === 'light'
    ? 'dataviz-light'
    : 'dataviz-dark';

  return map ? (
    <View style={styles.root}>
      <Map
        style={{width: '100%', height: '100%'}}
        mapStyle={`${MAPTILER_URL}${mapId}/style.json?key=${MAPTILER_KEY}`}
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
