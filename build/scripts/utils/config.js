import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Read and parse config.yaml file
 */
export function parseConfig() {
  try {
    const configPath = join(__dirname, '../../../config.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    const config = {};
    // Simple YAML parser for key-value pairs
    const lines = configContent.split('\n');
    for (const line of lines) {
      const match = line.match(/^([A-Z_]+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        config[key] = value.trim();
      }
    }
    return config;
  } catch (error) {
    console.error('Failed to read config.yaml:', error.message);
    return {};
  }
}
