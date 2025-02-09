import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useState, useEffect} from 'react';
import {useHfsImporter} from 'media/dir/hfs';
import {Watermark} from 'app/stacks/watermark';

export function HfsNoEntries() {
  const [visible, setVisible] = useState(false);
  const {importFolder} = useHfsImporter();
  const {t} = useLingui();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <View style={{marginTop: 30, marginHorizontal: 4}}>
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
  ) : null;
}
