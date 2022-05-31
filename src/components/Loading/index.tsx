import React from 'react';
import { ActivityIndicator, ColorValue } from 'react-native';
import { useTheme } from 'styled-components';

interface IProps {
  color?: ColorValue;
}
export const Loading = ({ color }: IProps) => {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      color={color ? color : colors.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
};
