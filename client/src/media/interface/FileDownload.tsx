import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {Watermark} from './Watermark';

interface FileDownload {
  path: string,
  name: string,
  extension: string,
  maximized: boolean,
}

export function FileDownload(props: FileDownload) {
  const {i18n} = useLingui();
  return (
    <Watermark
      title={`${props.name}.${props.extension}`}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => {
        console.log('Download', props.path);
      }}
    />
  );
}
