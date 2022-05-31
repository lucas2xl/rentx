import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { CardTDO } from '../dtos/CarDTO';
import { AnimationLoad } from '../components/AnimationLoad';

export type AppRoutes = {
  Home: undefined;
  CarDetails: { car: CardTDO };
  Scheduling: {
    car: CardTDO;
  };
  SchedulingDetails: {
    car: any;
    dates: string[];
  };
  MyCars: undefined;
  SignUpFirstStep: undefined;
  SignUpEndStep: {
    user: {
      name: string;
      email: string;
      driverLicense: string;
    };
  };
  SignIn: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {}
  }
}

export const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AnimationLoad />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
