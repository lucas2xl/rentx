import React from 'react';
import { Wrapper, Title } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface IProps extends RectButtonProps {
  title: string;
}

export const ConfirmButton = ({ title, ...rest }: IProps) => {
  return (
    <Wrapper {...rest}>
      <Title>{title}</Title>
    </Wrapper>
  );
};
