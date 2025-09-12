import * as $ from '@evolu/common';
import schema from 'app/data/schema';
import deps from './evolu';
import cfg from 'config';

const evolu = $.createEvolu(deps)(schema, {
  name: $.getOrThrow($.SimpleName.from(`${cfg.APP_NAME}-${cfg.STORE_VERSION}`)),
  syncUrl: cfg.SYNC_HOST,
  enableLogging: __DEV__,
});

evolu.subscribeError(() => {
  const error = evolu.getError();
  if (!error) return;
  console.error(error);
});

export default evolu;
