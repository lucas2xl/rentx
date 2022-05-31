import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons';
import {
  Wrapper,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { Alert, StatusBar } from 'react-native';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { CardTDO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { formaDate } from '../../utils/getPlatformDate';
import { api } from '../../services';
import { useAuth } from '../../hooks/auth';

interface IParms {
  car: CardTDO;
  dates: string[];
}

export const SchedulingDetails = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as IParms;

  const [isSchedulingCompleteModal, setIsSchedulingCompleteModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const rentalPeriod = {
    start: formaDate(dates[0]),
    end: formaDate(dates.length - 1),
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await api.post(`/rentals`, {
        user_id: user.id,
        car_id: car.id,
        start_date: dates[0],
        end_date: dates[dates.length - 1],
        total: car.price * dates.length,
      });

      setIsSchedulingCompleteModal(true);
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento!');
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => {
    setIsSchedulingCompleteModal(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const getTotalPrice = () => {
    return (car.price * dates.length).toFixed(2);
  };

  return (
    <Wrapper>
      <Header>
        <StatusBar
          barStyle={
            isSchedulingCompleteModal ? 'light-content' : 'dark-content'
          }
          translucent
          backgroundColor="transparent"
        />
        <BackButton />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => {
            return (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            );
          })}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {getTotalPrice()}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={colors.success}
          onPress={handleConfirm}
          loading={loading}
        />
      </Footer>

      <Modal
        visible={isSchedulingCompleteModal}
        onPress={handleBackHome}
        title="Carro alugado!"
        message={`Agora você so precisa ir\natê a concessionário da RENTX\n
        pegar o seu automóvel`}
      />
    </Wrapper>
  );
};
