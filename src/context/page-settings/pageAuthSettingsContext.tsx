import { createContext, useContext } from 'react';

import { AuthAccessLevel } from '@/constants';

import type { IAuthInitialProps } from '@/types';

const defaultAuthSettings: IAuthInitialProps = {
  accessLevel: AuthAccessLevel.Public,
};

export const PageAuthSettingsContext = createContext<IAuthInitialProps>(defaultAuthSettings);

export const usePageAuthSettings = () => {
  return useContext(PageAuthSettingsContext);
};

export const PageAuthSettingsContextProvider = PageAuthSettingsContext.Provider;
