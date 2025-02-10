import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {Watermark} from 'app/stacks/watermark';

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
        title={t`No items selected. Drop items or select files to import.`}
        label={t`Import Files`}
        icon="ph:upload"
        dnd={true}
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
