import { UserRole } from '@/constants';

import type { IFullUserResponse } from '@/data-transfer/responses';

const getAuthRedirect = (user?: IFullUserResponse | null) => {
  if (!user) {
    return '/sign-in';
  }

  // Handle additional redirects here
  if (user.role === UserRole.Admin) {
    return '/admin';
  }

  return '/';
};

export default getAuthRedirect;
