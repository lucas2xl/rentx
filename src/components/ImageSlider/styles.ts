import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: 126px;

  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;

  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;
