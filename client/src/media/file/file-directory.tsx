import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDirHfs} from 'media/dir/hooks/use-dir-hfs';
import {DirHfs} from 'media/dir/stacks/dir-hfs';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileDirectory extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileDirectory,
  _ref: React.Ref<unknown>,
) => {
  const {hfs, cmd, ext} = useDirHfs(path);
  const {styles} = useStyles(stylesheet);
  const bar = {hidden: true};

  useEffect(() => {
    if (!hfs) return;
    actions.setInfo(`${hfs.list?.length ?? 0} files`);
  }, [hfs, actions]);

  return (
    <Panel
      title={embedded ? name : undefined}
      message={embedded ? `${hfs?.list?.length} files` : undefined}
      margin="none"
      noBackground
      fullWidth
      noFrame>
      <View style={styles.root}>
        {hfs && <DirHfs {...{hfs, cmd, ext, bar}}/>}
      </View>
    </Panel>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    paddingBottom: theme.display.space5,
  },
}));
