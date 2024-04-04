import {writeFileSync} from 'fs';
import config from 'react-native-ultimate-config/index.web';

writeFileSync('./gen/app.json', JSON.stringify({
  "name": config.APP_NAME,
  "displayName": config.APP_NAME,
  "svgAppIcon": {
    "foregroundPath": "../../../content/public/svgs/logo.svg",
    "backgroundPath": "../../../content/public/svgs/logo-bg.svg"
  }
}, null, 2));
