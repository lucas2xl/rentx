import React from 'react';
import {
  Wrapper,
  Detail,
  Brand,
  Name,
  About,
  Rent,
  Period,
  PriceWrapper,
  Price,
  CarImage,
} from './styles';
import { CardTDO } from '../../dtos/CarDTO';
import { RectButtonProps } from 'react-native-gesture-handler';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface ICardData extends RectButtonProps {
  data: CardTDO;
}

export const Car = ({ data, ...rest }: ICardData) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Wrapper {...rest}>
      <Detail>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>

            <PriceWrapper>
              <Price>{`R$ ${data.price}`}</Price>

              <MotorIcon />
            </PriceWrapper>
          </Rent>
        </About>
      </Detail>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Wrapper>
  );
};
