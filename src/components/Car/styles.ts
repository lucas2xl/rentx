import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled(RectButton)`
  flex-direction: row;
  width: 100%;
  height: 126px;

  justify-content: space-between;
  align-items: center;

  border-radius: 5px;

  padding: 24px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;
export const Detail = styled.View``;

export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`;

export const PriceWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Price = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};

  margin-right: 24px;
`;

export const CarImage = styled.Image`
  width: 187px;
  height: 85px;
`;
