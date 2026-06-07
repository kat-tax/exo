import {Game, PLATFORMS} from 'react-exo/game';
import {StyleSheet, withUnistyles} from 'react-native-unistyles';
import {useEffect, forwardRef} from 'react';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {GameProps} from 'react-exo/game';

export interface FileGame extends FileProps {
  platform: GameProps['platform'],
}

export interface GameRef extends Game {}

const UniGame = withUnistyles(Game);

export default forwardRef((
  {path, name, actions, platform, embedded}: FileGame,
  ref: React.Ref<GameRef>,
) => {
  const source = useFile(path, 'dataUrl');

  useEffect(() => {
    if (!source) return;
    actions.setInfo(PLATFORMS[platform]);
  }, [source, platform, actions]);

  return source ? (
    <UniGame
      ref={ref}
      url={source}
      name={name}
      platform={platform}
      uniProps={(theme) => ({
        accent: theme.colors.accent,
        background: theme.colors.neutral,
      })}
      bios={`/.bios/${platform}.bin`}
      style={styles.root}
      startOnLoaded={!embedded}
      threads
    />
  ) : null;
});

const styles = StyleSheet.create(() => ({
  root: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
}));
