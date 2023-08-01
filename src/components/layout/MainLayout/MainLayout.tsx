import { Box } from '@mui/material';

import { Header } from '@/components';

import styles from './styles';

import type { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box sx={styles.container}>
      <Header />
      <main>{children}</main>
      <footer>FOOTER</footer>
    </Box>
  );
};

export default MainLayout;
