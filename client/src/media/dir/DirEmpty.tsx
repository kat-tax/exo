import {useLingui} from '@lingui/react/macro';
import {useImporter} from 'media/hooks/useImporter';
import {Watermark} from 'media/stacks/Watermark';

export function DirEmpty() {
  const {importFolder} = useImporter();
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
