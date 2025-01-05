import {Game, PLATFORMS} from 'react-exo/game';

import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {GameProps} from 'react-exo/game';

export interface FileGame extends FileProps {
  platform: GameProps['platform'],
}

export interface GameRef extends Game {}

export default forwardRef((props: FileGame, ref: React.Ref<GameRef>) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles, theme} = useStyles(stylesheet);

  // Update file player bar info
  useEffect(() => {
    if (!source) return;
    props.actions.setInfo(PLATFORMS[props.platform]);
  }, [source, props.platform, props.actions]);

  return source ? (
    <Game
      ref={ref}
      url={source}
      name={props.name}
      platform={props.platform}
      accent={theme.colors.accent}
      background={theme.colors.neutral}
      bios={`/.bios/${props.platform}.bin`}
      style={styles.root}
      startOnLoaded
    />
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
