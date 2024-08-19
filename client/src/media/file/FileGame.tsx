import {Game} from 'react-exo/game';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';
import type {GameProps} from 'react-exo/game';

interface FileGame extends FileProps {
  name: string,
  extension: string,
  platform: GameProps['platform'],
}

export default forwardRef((props: FileGame, ref: React.Ref<Game>) => {
  const {styles, theme} = useStyles(stylesheet);
  const rom = useDataUrl(props.path);

  return rom ? (
    <Game
      ref={ref}
      url={rom}
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
