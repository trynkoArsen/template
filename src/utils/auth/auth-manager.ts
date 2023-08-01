import auth from '@devimasolutions/auth';

import { createAuthOptions } from '@/constants';

import type { IFullUserResponse } from '@/data-transfer/responses';
import type { ISignInParams } from '@/types';
import type { IAuthManager } from '@devimasolutions/auth';

// Create a singleton to use in any part of your project
export let authManager: IAuthManager<IFullUserResponse, ISignInParams> | null = null;

export const setAuthManager = (manager: IAuthManager<IFullUserResponse, ISignInParams>) => {
  authManager = manager;
  return authManager;
};

let initializationPromise: Promise<IAuthManager<IFullUserResponse, ISignInParams>> | null = null;
export const getAuthManager = async () => {
  if (authManager) {
    // if another authentication manager is initializing, we need to wait for it.
    if (initializationPromise) {
      await initializationPromise;
      initializationPromise = null;
    }
    return authManager;
  }
  authManager = auth.initAuth(createAuthOptions());
  const refreshToken = authManager.getRefreshToken();
  // If there is a refresh token, the user might be authorized.
  // Try to refresh token to get up to date information bout user
  if (refreshToken) {
    initializationPromise = authManager.refreshToken(refreshToken);
    await initializationPromise;
  }
  return authManager;
};
