import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useState, useEffect} from 'react';
import {useImportHfs} from 'media/dir/hooks/use-import-hfs';
import {Watermark} from 'app/stacks/watermark';
import {isTouch} from 'react-exo/utils';

const TOUCH = isTouch();

export function ListEmpty({offset}: {offset: number}) {
  const [visible, setVisible] = useState(false);
  const {importFolder} = useImportHfs();
  const {t} = useLingui();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <View style={{marginHorizontal: 10, flex: 1, justifyContent: 'center'}}>
      <View style={{marginTop: offset}}>
        <Watermark
          title={TOUCH
            ? t`Directory empty. Select folder to import.`
            : t`Directory empty. Drop items or select folder to import.`}
          label={t`Import Folder`}
          icon="ph:upload"
          dnd={!TOUCH}
          onAction={async () => {
            await importFolder();
          }}
        />
      </View>
    </View>
  ) : null;
}
