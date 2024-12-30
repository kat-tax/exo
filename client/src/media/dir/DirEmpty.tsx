import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useImporter} from 'media/hooks/useImporter';
import {Watermark} from 'media/stacks/Watermark';

export function DirEmpty({path = '.'}: {path: string}) {
  const {importFolder} = useImporter();
  const {i18n} = useLingui();
  return (
    <Watermark
      title={t(i18n)`Directory is empty.`}
      label={t(i18n)`Import`}
      icon="ph:upload"
      dnd={true}
      onAction={async () => {
        await importFolder(path);
      }}
    />
  );
}
