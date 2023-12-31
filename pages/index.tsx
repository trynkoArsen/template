import { AuthAccessLevel } from '@/constants';
import { withPageSettings } from '@/utils';

const Home = () => {
  return (
    <>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  );
};

export const getServerSideProps = withPageSettings({
  auth: { accessLevel: AuthAccessLevel.Public },
  metaData: {
    meta: [
      {
        name: 'description',
        content: 'Generated by create next app',
      },
    ],
  },
});

export default Home;
