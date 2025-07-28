export default [
  {
    name: 'Web',
    success: /\[client\]\s*\[web\]\s*➜\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[client\]\s*\[web\]\s*VITE\sv(\d+\.\d+\.\d+)\s*ready/,
    failure: /\[client\]\s*\[web\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
  {
    name: 'Native',
    success: /\[client\]\s*\[native\]\s*Fast\s*-\s*Scalable\s*-\s*Integrated/,
    version: /\[client\]\s*\[native\]\s*Welcome to Metro v(\d+\.\d+\.\d+)/,
    failure: /\[client\]\s*\[native\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: () => 'http://localhost:8081',
  },
  {
    name: 'Storybook',
    success: /\[storybook\]\s*\[storybook:web\]\s*│\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[storybook\]\s*\[storybook:web\]\s*│\s*Storybook\s*(\d+\.\d+\.\d+)\s*for\s*react-vite\s*started/,
    failure: /\[storybook\]\s*\[storybook:web\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
  {
    name: 'Documentation',
    success: /\[docs\]\s*➜\s*Local:\s*http:\/\/localhost:(\d+)/,
    version: /\[docs\]\s*\[running\]\s*vocs@v(\d+\.\d+\.\d+)/,
    failure: /\[docs\]\s* ELIFECYCLE\s*(\s*.*)/,
    devserver: (port) => `http://localhost:${port}`,
  },
]
