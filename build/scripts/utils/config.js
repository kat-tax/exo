/**
 * Read and parse .ultconfig.json file (if exists)
 */
export async function loadConfig() {
  try {
    return await import('../../../.ultconfig.json', {
      with: {type: 'json'},
    }).then(module => module.default);
  } catch (error) {
    return {};
  }
}
