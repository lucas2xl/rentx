import React from 'react';
import { Wrapper } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface IProps extends BorderlessButtonProps {
  color?: string;
}

export const BackButton = ({ color, ...rest }: IProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <Wrapper {...rest} onPress={handleBack}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : colors.text}
      />
    </Wrapper>
  );
};
