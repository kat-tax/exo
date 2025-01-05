import {useLingui} from '@lingui/react/macro';
import {useHfsImporter} from 'media/dir/hfs';
import {Watermark} from 'media/stacks/Watermark';

export function DirEmpty() {
  const {importFolder} = useHfsImporter();
  const {t} = useLingui();
  return (
    <Watermark
      title={t`Directory is empty.`}
      label={t`Import`}
      icon="ph:upload"
      dnd={true}
      onAction={async () => {
        await importFolder();
      }}
    />
  );
}
