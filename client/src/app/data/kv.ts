import {KV} from 'react-exo/kv';
import cfg from 'config';

export default KV.init(
  `${cfg.APP_NAME}::state`,
  cfg.STORE_VERSION,
);
