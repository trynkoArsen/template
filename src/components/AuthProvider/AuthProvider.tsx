import { AuthContextProvider } from '@/context/auth';

import useAuthProvider from './useAuthProvider';

import type { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = useAuthProvider();

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};

export default AuthProvider;
