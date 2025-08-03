import * as $ from '@evolu/common';
import cfg from 'config';
import deps from './lib/deps';
import schema from '../schema';

export default $.createEvolu(deps)(schema, {
  name: $.getOrThrow($.SimpleName.from(cfg.APP_NAME)),
  syncUrl: cfg.SYNC_HOST,
});
