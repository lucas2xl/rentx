import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';
import {
  Wrapper,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  UnderLine,
  Content,
  Footer,
} from './styles';
import { Calendar, IMarkedDatesProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateData } from 'react-native-calendars';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { formaDate } from '../../utils/getPlatformDate';
import { CardTDO } from '../../dtos/CarDTO';

interface IRentalPeriod {
  start: string;
  end: string;
}

interface IParms {
  car: CardTDO;
}

export const Scheduling = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as IParms;

  const [lastSelectedDate, setLastSelectedDate] = useState({} as DateData);
  const [markedDates, setMarkedDates] = useState({} as IMarkedDatesProps);
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod);

  const handleConfirmScheduling = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  };

  const handleChangeDate = (date: DateData) => {
    let start = lastSelectedDate.timestamp ? lastSelectedDate : date;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = new Date(Object.keys(interval)[0]).getTime();

    const lastDate = new Date(
      Object.keys(interval)[Object.keys(interval).length - 1]
    ).getTime();

    setRentalPeriod({
      start: formaDate(firstDate),
      end: formaDate(lastDate),
    });
  };

  console.log(rentalPeriod);

  return (
    <Wrapper>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <BackButton color={colors.shape} />

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>

            <DateValue>{rentalPeriod.start}</DateValue>
            {!rentalPeriod.start && <UnderLine />}
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>

            <DateValue>{rentalPeriod.end}</DateValue>
            {!rentalPeriod.end && <UnderLine />}
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmScheduling}
          enabled={!!rentalPeriod.start || !!rentalPeriod.end}
        />
      </Footer>
    </Wrapper>
  );
};
