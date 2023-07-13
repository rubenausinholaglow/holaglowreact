import Bugsnag from '@bugsnag/js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import BugsnagPluginReact from '@bugsnag/plugin-react';

// @ts-ignore
const bugsnagClient = Bugsnag({
  apiKey: 'ddc16c7fe2c290310470f8ce76dfa563',
  plugins: [BugsnagPluginReact],
});

export default bugsnagClient;
