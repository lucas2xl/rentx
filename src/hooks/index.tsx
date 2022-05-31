import React from 'react';

import { AuthProvider } from './auth';

interface IAppProvideProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: IAppProvideProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
