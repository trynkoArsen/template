import { getAuthManager } from '@/utils';

import type { ISuccessResponse } from '@/data-transfer/responses';
import type { IVerifyAccountData } from '@/redux/authorization/types';

const sendForgotPassword = async (email: string) => {
  const auth = await getAuthManager();
  const response = await auth.axios
    .post<ISuccessResponse>('/auth/password/forgot', { email })
    .then((res) => res.data);

  return response;
};

const verifyAccount = async ({ verificationToken, password }: IVerifyAccountData) => {
  const auth = await getAuthManager();
  const response = await auth.axios
    .post<ISuccessResponse>('/auth/password/reset', {
      verificationToken,
      password,
    })
    .then((res) => res.data);

  return response;
};

const authorizationService = {
  sendForgotPassword,
  verifyAccount,
};
export default authorizationService;
