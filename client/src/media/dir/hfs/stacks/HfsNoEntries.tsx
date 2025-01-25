import {useLingui} from '@lingui/react/macro';
import {useHfsImporter} from 'media/dir/hfs';
import {Watermark} from 'media/stacks/Watermark';
import {View} from 'react-native';

export function HfsNoEntries() {
  const {importFolder} = useHfsImporter();
  const {t} = useLingui();
  return (
    <View style={{marginTop: 30}}>
      <Watermark
        title={t`Folder is empty. Drop items or select folder to import.`}
        label={t`Import`}
        icon="ph:upload"
        dnd={true}
        onAction={async () => {
          await importFolder();
        }}
      />
    </View>
  );
}
