import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IButtonStyleProps {
  color?: string;
  textColor?: string;
}

export const Wrapper = styled(RectButton)<IButtonStyleProps>`
  width: 100%;
  min-height: 55px;
  padding: 19px;

  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};

  border-radius: 5px;

  ${({ enabled }) =>
    !enabled &&
    css`
      opacity: 0.4;
    `}
`;

export const Title = styled.Text<IButtonStyleProps>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, textColor }) =>
    textColor ? textColor : theme.colors.shape};
`;
