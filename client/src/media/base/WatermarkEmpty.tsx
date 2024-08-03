import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useFileSystem} from 'app/hooks/useFileSystem';
import {Watermark} from './Watermark';

interface WatermarkEmptyProps {
  path?: string;
}

export function WatermarkEmpty({path = '.'}: WatermarkEmptyProps) {
  const {i18n} = useLingui();
  const {importDirectory} = useFileSystem();
  return (
    <Watermark
      title={t(i18n)`Directory is empty.`}
      label={t(i18n)`Import`}
      icon="ph:upload"
      dnd={true}
      onAction={async () => {
        await importDirectory(path);
      }}
    />
  );
}
