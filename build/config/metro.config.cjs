const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

module.exports = makeMetroConfig({
  // Needed for PNPM symlinks
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
  // Needed for Lingui imports
  transformer: {
    unstable_allowRequireContext: true,
  },
});
