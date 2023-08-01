import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';

import { authorizationService } from '@/services';
import { handleThunkApiError } from '@/utils';

import type { IVerifyAccountData } from './types';

export const sendForgotPassword = createAsyncThunk(
  'auth/sendForgotPassword',
  handleThunkApiError(authorizationService.sendForgotPassword),
);

export const sendVerifyAccount = createAsyncThunk(
  'auth/sendVerifyAccount',
  handleThunkApiError(async (action: IVerifyAccountData) => {
    await authorizationService.verifyAccount(action);
    Router.push('/sign-in');
  }),
);
