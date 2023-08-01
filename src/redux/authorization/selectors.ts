import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const authorizationsStateSelector = ({ auth }: RootState) => auth;

export const resetPasswordSent = createSelector(
  authorizationsStateSelector,
  (state) => state.isResetPasswordSent,
);
