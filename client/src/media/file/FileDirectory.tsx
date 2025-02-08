import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useHfs} from 'media/dir/hfs/hooks/useHfs';
import {HfsDir} from 'media/dir/hfs';
import {Page} from 'app/interface/Page';

import type {FileProps} from 'media/file';

export interface FileDirectory extends FileProps {}

export default forwardRef((props: FileDirectory, _ref) => {
  const {hfs, cmd, ext} = useHfs(props.path);
  const {styles} = useStyles(stylesheet);

  // Update file player bar info
  useEffect(() => {
    if (!hfs) return;
    props.actions.setInfo(`${hfs.list?.length ?? 0} files`);
  }, [hfs, props.actions]);

  return (
    <View style={styles.root}>
      <Page
        title={props.embedded ? props.name : undefined}
        message={props.embedded ? `${hfs?.list?.length} files` : undefined}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {hfs && <HfsDir {...{hfs, cmd, ext}}/>}
        </View>
      </Page>
    </View>
  )
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    marginHorizontal: theme.display.space2,
  },
  inner: {
    paddingBottom: theme.display.space5,
  },
}));
