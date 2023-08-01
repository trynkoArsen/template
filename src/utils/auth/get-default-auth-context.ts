import type { IAuthContext } from '@/types';

const getDefaultAuthContext = (): IAuthContext => {
  return {
    isLoading: true,
    user: null,
    accessToken: null,
    refreshToken: null,
    isSignedIn: false,
  };
};

export default getDefaultAuthContext;
