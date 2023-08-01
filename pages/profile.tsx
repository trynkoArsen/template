import { AuthAccessLevel } from '@/constants';
import { withPageSettings } from '@/utils';

const Home = () => {
  return (
    <>
      <h1>Profile </h1>
    </>
  );
};

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Authorized },
  metaData: { title: 'Profile' },
});

export default Home;
