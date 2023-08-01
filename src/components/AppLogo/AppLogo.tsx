import { Icon } from '@mui/material';
import Image from 'next/image';

import logoSvg from '@/public/logo.svg';
import { envUtil } from '@/utils';

import type { IconProps } from '@mui/material';

const { appName } = envUtil.getEnv();

const AppLogo = ({ fontSize = 'large', sx, ...props }: IconProps) => {
  return (
    <Icon {...props} sx={{ display: 'flex', position: 'relative', ...sx }} fontSize={fontSize}>
      <Image src={logoSvg} fill alt={appName} />
    </Icon>
  );
};

export default AppLogo;
