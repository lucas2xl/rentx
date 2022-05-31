import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Wrapper, Name } from './styles';

interface IProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export const Accessory = ({ icon: Icon, name }: IProps) => {
  return (
    <Wrapper>
      <Icon width={32} height={32} />
      <Name>{name}</Name>
    </Wrapper>
  );
};
