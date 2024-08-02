import {View} from 'react-native';
import html from './lib/emulatorjs.html';

import type {GameComponent, GameProps} from './Game.interface';

/** A component that runs an emulator for a rom */
export const Game: GameComponent = (props: GameProps) => {
  return (
    <View style={props.style}>
      <iframe
        srcDoc={html(props)}
        title={props.name}
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </View>
  );
}
