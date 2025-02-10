import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDirZip} from 'media/dir/hooks/use-dir-zip';
import {DirZip} from 'media/dir/stacks/dir-zip';
import {Panel} from 'app/stacks/panel';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {}

export default forwardRef((
  {path, name, actions, embedded}: FileZip,
  _ref,
) => {
  const {zip, cmd} = useDirZip(path);
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    if (!zip) return;
    const files = zip.list?.length ?? 0;
    const size = bytesize(zip.size?.compressed ?? 0);
    const msg = `${files} files, ${size}`;
    actions.setInfo(msg);
  }, [zip, actions]);

  return (
    <View style={styles.root}>
      <Panel
        title={embedded ? name : undefined}
        message={embedded ? `${zip?.list?.length} files` : undefined}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {zip && <DirZip {...{zip, cmd}}/>}
        </View>
      </Panel>
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
