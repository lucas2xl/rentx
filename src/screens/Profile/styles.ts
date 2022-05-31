import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IOptionStyle {
  active: boolean;
}

export const Wrapper = styled.View``;

export const Header = styled.View`
  width: 100%;
  height: 227px;

  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;

  border-radius: 90px;

  margin-top: 48px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  position: absolute;
  bottom: 10px;
  right: 5px;

  width: 40px;
  height: 40px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 112px;
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  padding-bottom: 5px;
  margin-bottom: 24px;
`;

export const Option = styled(TouchableOpacity)<IOptionStyle>`
  align-items: center;
  justify-content: center;

  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const OptionTitle = styled.Text<IOptionStyle>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.text_detail};

  ${({ theme, active }) =>
    active &&
    css`
      font-family: ${({ theme }) => theme.fonts.secondary_500};
      color: ${({ theme }) => theme.colors.header};
    `}
`;

export const Section = styled.View`
  margin: 0 24px;
`;

export const Form = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Spacing = styled.View`
  margin-bottom: 8px;
`;
