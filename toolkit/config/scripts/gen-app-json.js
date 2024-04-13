import {writeFileSync} from 'node:fs';
import config from '../gen/index.cjs';

writeFileSync('./gen/app.json', JSON.stringify({
  "name": config.APP_NAME,
  "displayName": config.APP_DISPLAY_NAME,
  "svgAppIcon": {
    // TODO: detect logo path
    "foregroundPath": "../../../design/assets/svg/logo.svg",
    "backgroundPath": "../../../design/assets/svg/logo-bg.svg"
  }
}, null, 2));
