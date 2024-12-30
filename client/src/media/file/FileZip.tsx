import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileZip} from 'media/hooks/useFileZip';
import {DirZip} from 'media/dir/DirZip';
import {Page} from 'app/interface/Page';

import type {FileProps} from 'media/file';

export interface FileZip extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileZip, _ref) => {
  const {zip, extract} = useFileZip(props.path);
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Page
        title={`${props.name}.${props.extension}`}
        message={''}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {zip && <DirZip {...{zip, extract}}/>}
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
