import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useDispatch} from 'react-redux';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Watermark} from 'app/stacks/watermark';
import media from 'media/store';

export function History() {
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();
  const put = useDispatch();
  return (
    <View style={styles.root}>
        <Watermark
          title={'No items selected. Press the button below to select all items.'}
          label={t`Select All`}
          icon="ph:selection-all"
          onAction={async () => {
            put(media.actions.selectBulk('all'));
          }}
        />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 2,
    backgroundColor: theme.colors.neutral,
  },
}));
