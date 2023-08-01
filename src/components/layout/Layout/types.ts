import type { Layout } from '@/types';
import type { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
  layoutType?: Layout;
}
