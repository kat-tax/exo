const {configureProjects} = require('react-native-test-app');

module.exports = configureProjects({
  android: {
    sourceDir: 'android',
  },
  ios: {
    sourceDir: 'ios',
  },
  macos: {
    sourceDir: 'macos',
  },
  visionos: {
    sourceDir: 'visionos',
  },
  windows: {
    sourceDir: 'windows',
    solutionFile: 'windows/EXO.sln',
  },
});
