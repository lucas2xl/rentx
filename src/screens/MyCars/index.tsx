import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Header,
  CarList,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentTitle,
  AppointmentQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { CardTDO } from '../../dtos/CarDTO';
import { api } from '../../services';
import { Alert, StatusBar } from 'react-native';
import { Car } from '../../components/Car';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { formaDate } from '../../utils/getPlatformDate';
import { AnimationLoad } from '../../components/AnimationLoad';
import { useAuth } from '../../hooks/auth';
import { useIsFocused } from '@react-navigation/native';

export interface ICarProps {
  user_id: number;
  id: number;
  car: CardTDO;
  start_date: string;
  end_date: string;
  total: string;
}

export const MyCars = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const [cars, setCars] = useState<ICarProps[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isFocused && fetchCars();
  }, [isFocused]);

  const fetchCars = async () => {
    try {
      const { data } = await api.get(`/rentals`);
      setCars(data);
    } catch (error: any) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <BackButton color={colors.shape} />

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <Subtitle>Conforto, segunrança e paticidade</Subtitle>
      </Header>
      {loading ? (
        <AnimationLoad />
      ) : (
        <Content>
          <Appointments>
            <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
            <AppointmentQuantity>{cars?.length}</AppointmentQuantity>
          </Appointments>

          <CarList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{formaDate(item.start_date)}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{formaDate(item.end_date)}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Wrapper>
  );
};
