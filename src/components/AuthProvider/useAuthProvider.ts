import { useEffect, useState } from 'react';

import { getAuthManager, getCurrentAuthData, getDefaultAuthContext } from '@/utils';

import type { IAuthContext } from '@/types';
import type { AuthCallbackUnsubscriber } from '@devimasolutions/auth';

const useAuthProvider = () => {
  const [value, setValue] = useState<IAuthContext>(getDefaultAuthContext());

  useEffect(() => {
    let unsubscribeStateChanged: AuthCallbackUnsubscriber;
    // Initialize library
    getAuthManager().then((auth) => {
      // Update initial state
      setValue((prev) => ({ ...prev, isLoading: false, ...getCurrentAuthData(auth) }));

      unsubscribeStateChanged = auth.onStateChanged(() => {
        setValue((prev) => ({ ...prev, ...getCurrentAuthData(auth) }));
      });
    });

    return () => {
      unsubscribeStateChanged?.();
    };
  }, []);
  return value;
};

export default useAuthProvider;
