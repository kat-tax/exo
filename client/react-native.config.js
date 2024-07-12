const project = (() => {
  try {
    const {configureProjects} = require('react-native-test-app');
    return configureProjects({
      android: {
        sourceDir: 'app/android',
      },
      ios: {
        sourceDir: 'app/ios',
      },
      macos: {
        sourceDir: 'app/macos',
      },
      visionos: {
        sourceDir: 'app/visionos',
      },
      windows: {
        sourceDir: 'app/windows',
        solutionFile: 'app/windows/EXO.sln',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? {project} : undefined),
};
