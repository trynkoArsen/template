import { AuthAccessLevel } from '@/constants';

import type { UserRole } from '@/constants';
import type { IFullUserResponse } from '@/data-transfer/responses';
import type { IAuthInitialProps } from '@/types';

const checkUserPermissions = (role: UserRole, permissions?: UserRole[]) => {
  // Provided permission list includes user role.
  return permissions?.length ? permissions.includes(role) : true;
};

// Feel free to place additional authorization checks here
const isUserAuthenticatedForRoute = (
  user: IFullUserResponse | null,
  authSettings: IAuthInitialProps,
) =>
  // This route is private
  authSettings.accessLevel === AuthAccessLevel.Authorized &&
  // The user is signed in
  !!user &&
  // The user has a corresponding role
  checkUserPermissions(user.role, authSettings.permissions);

const isRouteAvailable = (
  user: IFullUserResponse | null,
  isLoading: boolean,
  authSettings: IAuthInitialProps,
) => {
  // This is a route available for any user
  const isPublicRoute = authSettings.accessLevel === AuthAccessLevel.Public;

  if (isPublicRoute) {
    // Allow prerender public page regardless of auth status
    return {
      isAvailable: true,
      shouldRedirect: false,
    };
  }

  // Await for authentication for non public routes
  if (isLoading) {
    return {
      isAvailable: false,
      shouldRedirect: false,
    };
  }

  // This route is available for unauthorized users only
  // and current user is unauthorized
  const isUnauthorizedRoute = !user && authSettings.accessLevel === AuthAccessLevel.Unauthorized;

  const isPageAvailable = isUnauthorizedRoute || isUserAuthenticatedForRoute(user, authSettings);

  return {
    isAvailable: isPageAvailable,
    shouldRedirect: !isPageAvailable,
  };
};

export default isRouteAvailable;
