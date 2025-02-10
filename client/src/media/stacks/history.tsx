import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {Watermark} from 'app/stacks/watermark';
import {isTouch} from 'react-exo/utils';

const TOUCH = isTouch();

interface HistoryProps {
  path: string,
}

export function History(props: HistoryProps) {
  const {importFile} = useImportHfs();
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <View style={styles.root}>
      <Watermark
        title={TOUCH
          ? t`No items selected. Drop items or select files to import.`
          : t`No items selected. Select files to import.`}
        label={t`Import Files`}
        icon="ph:upload"
        dnd={!TOUCH}
        onAction={async () => {
          await importFile();
        }}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 2,
    backgroundColor: theme.colors.neutral,
  },
}));
