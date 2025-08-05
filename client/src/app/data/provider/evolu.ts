import * as $ from '@evolu/common';
import cfg from 'config';
import deps from './lib/deps';
import schema from '../schema';

const evolu = $.createEvolu(deps)(schema, {
  name: $.getOrThrow($.SimpleName.from(`${cfg.APP_NAME}-${cfg.STORE_VERSION}`)),
  syncUrl: cfg.SYNC_HOST,
  enableLogging: __DEV__,
});

evolu.subscribeError(() => {
  const error = evolu.getError();
  if (!error) return;
  alert('🚨 Evolu error occurred! Check the console.');
  console.error(error);
});

export default evolu;
