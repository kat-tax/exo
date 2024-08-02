import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {Watermark} from './Watermark';

interface FileDownload {
  path: string,
  name: string,
}

export function FileDownload(props: FileDownload) {
  const {i18n} = useLingui();
  return (
    <Watermark
      title={props.path}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => {
        console.log('Download', props.path);
      }}
    />
  );
}
