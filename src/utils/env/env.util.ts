import { EnvMode } from './env.type';

import type { IEnv } from './env.type';

const processEnvMode = process.env.NODE_ENV?.toLowerCase() as EnvMode;
const envMode = Object.values(EnvMode).includes(processEnvMode) ? processEnvMode : EnvMode.DEV_ENV;

const isEnv = (mode: EnvMode) => envMode.toLowerCase() === mode;

export const getEnvMode = () => envMode;

export const isDevEnv = () => isEnv(EnvMode.DEV_ENV);

export const isProdEnv = () => isEnv(EnvMode.PROD_ENV);

export const isTestEnv = () => isEnv(EnvMode.TEST_ENV);

const mapEnv = () => {
  const parsed: IEnv = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || '',
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || '',
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  };

  return Object.freeze(parsed);
};

let env: IEnv;
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
  }
  return env;
};
