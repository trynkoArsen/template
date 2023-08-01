import { useRouter } from 'next/router';

import { AuthAccessLevel } from '@/constants';
import { getAuthRedirect, isRouteAvailable } from '@/utils';

import type { IAuthContext, IAuthInitialProps } from '@/types';

const useAuthGate = (auth: IAuthContext, authSettings?: IAuthInitialProps) => {
  const router = useRouter();

  const ensureAuthSettings = {
    accessLevel: authSettings?.accessLevel || AuthAccessLevel.Public,
    permissions: authSettings?.permissions,
  };
  const { isAvailable, shouldRedirect } = isRouteAvailable(
    auth.user,
    auth.isLoading,
    ensureAuthSettings,
  );

  // Redirect only when auth is loaded
  // Blank screen will be displayed before this
  if (shouldRedirect) {
    // Perform redirect on a same render cycle to prevent UI flickering
    router.replace(getAuthRedirect(auth.user));
  }

  return { ensureAuthSettings, isAvailable };
};

export default useAuthGate;
