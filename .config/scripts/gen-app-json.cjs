/** @type {import('node').writeFileSync} */
const {writeFileSync} = require('node:fs');

/** @type {import('react-native-ultimate-config').ConfigVariables} */
const {APP_NAME} = require('react-native-ultimate-config/index.web');

writeFileSync('./gen/app.json', JSON.stringify({
  "name": APP_NAME,
  "displayName": APP_NAME,
  "svgAppIcon": {
    // TODO: detect logo path
    "foregroundPath": "../../../design/assets/svg/logo.svg",
    "backgroundPath": "../../../design/assets/svg/logo-bg.svg"
  }
}, null, 2));
