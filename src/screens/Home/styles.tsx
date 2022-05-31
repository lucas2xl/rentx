import { FlatList, FlatListProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { CardTDO } from '../../dtos/CarDTO';
import Animated from 'react-native-reanimated';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  height: 113px;

  align-items: flex-end;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const MyCarsButton = styled(
  Animated.createAnimatedComponent(RectButton)
)`
  height: 60px;
  width: 60px;

  border-radius: 30px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CardTDO>) => FlatList<CardTDO>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() },
})`
  margin: 24px 24px 0 24px;
`;
