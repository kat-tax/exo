import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {Watermark} from './Watermark';

export function WatermarkEmpty() {
  const {i18n} = useLingui();
  return (
    <Watermark
      title={t(i18n)`Directory is empty`}
      label={t(i18n)`Import`}
      icon="ph:upload"
      onAction={() => {
        console.log('Upload');
      }}
    />
  );
}
