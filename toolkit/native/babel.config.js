const path = require('path');
const pkg = require('../../package.json');

module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // For development, we want to alias the library to the source
            [pkg.name]: path.join(__dirname, '../..', pkg.source)
          }
        }
      ]
    ]
  }
}
