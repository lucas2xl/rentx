import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabRoutes = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: colors.background_primary,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text_detail,
      }}
    >
      <Screen
        name="HomeTab"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} color={color} />
          ),
        }}
      />

      <Screen
        name="MyCarsTab"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} color={color} />
          ),
        }}
      />

      <Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
