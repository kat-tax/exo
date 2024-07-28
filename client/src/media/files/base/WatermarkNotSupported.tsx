import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {Watermark} from './Watermark';

export function WatermarkNotSupported() {
  const {i18n} = useLingui();
  return (
    <Watermark
      title={t(i18n)`File cannot be previewed`}
      label={t(i18n)`Download`}
      icon="ph:download"
      onAction={() => {
        console.log('Download');
      }}
    />
  );
}
