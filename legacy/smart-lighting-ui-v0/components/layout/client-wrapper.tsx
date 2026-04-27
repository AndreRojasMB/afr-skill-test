'use client';

import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { ReactNode } from 'react';

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      {children}
    </>
  );
}
