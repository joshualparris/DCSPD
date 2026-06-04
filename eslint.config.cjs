const nextConfig = require('eslint-config-next');
const reactHooks = require('eslint-plugin-react-hooks');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Hydration from localStorage legitimately runs in effects across the app.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];
