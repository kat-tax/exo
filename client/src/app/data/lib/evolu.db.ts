import * as $ from '@evolu/common';
import schema from 'app/data/schema';
import deps from './evolu';
import cfg from 'config';

const evolu = $.createEvolu(deps)(schema, {
  name: $.getOrThrow($.SimpleName.from(`${cfg.APP_NAME}-${cfg.STORE_VERSION}`)),
  enableLogging: false,
  //enableLogging: __DEV__,
  transports: [
    {type: 'WebSocket', url: cfg.EVOLU_RELAY},
  ],
});

evolu.subscribeError(() => {
  const error = evolu.getError();
  if (!error) return;
  console.error(error);
});

export default evolu;
