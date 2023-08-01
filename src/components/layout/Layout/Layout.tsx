import dynamic from 'next/dynamic';

import { Layout as LayoutTypes } from '@/types';

import type { ILayoutProps } from './types';

const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'));
const EmptyLayout = dynamic(() => import('@/components/layout/EmptyLayout'));
const MainLayout = dynamic(() => import('@/components/layout/MainLayout'));

const layoutMap = {
  [LayoutTypes.Main]: MainLayout,
  [LayoutTypes.Auth]: AuthLayout,
  [LayoutTypes.Empty]: EmptyLayout,
};

const Layout = ({ children, layoutType = LayoutTypes.Main }: ILayoutProps) => {
  const LayoutComponent = layoutMap[layoutType];
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default Layout;
