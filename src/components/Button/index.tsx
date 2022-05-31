import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Loading } from '../Loading';
import { Wrapper, Title } from './styles';

interface IProps extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  loading?: boolean;
}

export const Button = ({
  title,
  color,
  textColor,
  enabled = true,
  loading,
  ...rest
}: IProps) => {
  const { colors } = useTheme();
  return (
    <Wrapper {...rest} enabled={enabled && !loading} color={color}>
      {loading ? (
        <Loading color={colors.shape} />
      ) : (
        <Title textColor={textColor}>{title}</Title>
      )}
    </Wrapper>
  );
};
