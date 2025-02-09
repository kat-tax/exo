import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useHfs} from 'media/dir/hfs/hooks/use-hfs';
import {HfsDir} from 'media/dir/hfs';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileDirectory extends FileProps {}

export default forwardRef((props: FileDirectory, _ref) => {
  const {hfs, cmd, ext} = useHfs(props.path);
  const {styles} = useStyles(stylesheet);
  const bar = {hidden: true};

  // Update file player bar info
  useEffect(() => {
    if (!hfs) return;
    props.actions.setInfo(`${hfs.list?.length ?? 0} files`);
  }, [hfs, props.actions]);

  return (
    <Panel
      title={props.embedded ? props.name : undefined}
      message={props.embedded ? `${hfs?.list?.length} files` : undefined}
      margin="none"
      noBackground
      fullWidth
      noFrame>
      <View style={styles.root}>
        {hfs && <HfsDir {...{hfs, cmd, ext, bar}}/>}
      </View>
    </Panel>
  )
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    paddingBottom: theme.display.space5,
  },
}));
