import { AuthAccessLevel } from '@/constants';
import SignIn from '@/page-content/SignIn';
import { Layout } from '@/types';
import { withPageSettings } from '@/utils';

export default function SignInPage() {
  return <SignIn />;
}

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Unauthorized },
  metaData: { title: 'Sign in' },
  layout: Layout.Auth,
});
