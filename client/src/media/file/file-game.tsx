import {Game, PLATFORMS} from 'react-exo/game';
import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {GameProps} from 'react-exo/game';

export interface FileGame extends FileProps {
  platform: GameProps['platform'],
}

export interface GameRef extends Game {}

export default forwardRef((
  {path, name, actions, platform, embedded}: FileGame,
  ref: React.Ref<GameRef>,
) => {
  const source = useFile(path, 'dataUrl');
  const {styles, theme} = useStyles(stylesheet);

  useEffect(() => {
    if (!source) return;
    actions.setInfo(PLATFORMS[platform]);
  }, [source, platform, actions]);

  return source ? (
    <Game
      ref={ref}
      url={source}
      name={name}
      platform={platform}
      accent={theme.colors.accent}
      background={theme.colors.neutral}
      bios={`/.bios/${platform}.bin`}
      style={styles.root}
      startOnLoaded={!embedded}
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
    position: 'absolute',
  },
}));
