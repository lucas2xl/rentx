import React from 'react';
import { Wrapper } from './styles';

interface IProps {
  active?: boolean;
}

export const Bullet = ({ active = false }: IProps) => {
  return <Wrapper active={active} />;
};
