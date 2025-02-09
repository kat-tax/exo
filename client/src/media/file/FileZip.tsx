import {View} from 'react-native';
import {forwardRef, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useZip, ZipDir} from 'media/dir/zip';
import {bytesize} from 'app/utils/formatting';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {}

export default forwardRef((props: FileZip, _ref) => {
  const {zip, cmd} = useZip(props.path);
  const {styles} = useStyles(stylesheet);

  // Update file player bar info
  useEffect(() => {
    if (!zip) return;
    const files = zip.list?.length ?? 0;
    const size = bytesize(zip.size?.compressed ?? 0);
    const msg = `${files} files, ${size}`;
    props.actions.setInfo(msg);
  }, [zip, props.actions]);

  return (
    <View style={styles.root}>
      <Panel
        title={props.embedded ? props.name : undefined}
        message={props.embedded ? `${zip?.list?.length} files` : undefined}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {zip && <ZipDir {...{zip, cmd}}/>}
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
