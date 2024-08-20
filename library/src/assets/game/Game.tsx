import {Component, createRef} from 'react';
import {View} from 'react-native';
import html from './lib/emulatorjs.html';

import type {GameProps} from './Game.interface';

/** A component that runs an emulator for a rom */
export class Game extends Component<GameProps> {
  #iframe = createRef<HTMLIFrameElement>();

  play() {
    this.cmd('emu:play');
  }

  pause() {
    this.cmd('emu:pause');
  }

  cmd(type: string, data?: unknown) {
    this.#iframe.current?.contentWindow?.postMessage(JSON.stringify({
      type,
      data,
    }), 'null');
  }

  render() {
    const {style} = this.props;
    return (
      <View style={style}>
        <iframe
          srcDoc={html(this.props)}
          title={this.props.name}
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
}
