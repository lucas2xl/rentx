import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput as Input } from 'react-native';
import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface IInputStyles {
  isFocused: boolean;
}

export const Wrapper = styled.View<IInputStyles>`
  width: 100%;
  height: 50px;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  border-radius: 5px;

  align-items: center;

  border-width: 2px;
  border-color: transparent;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const IconWrapper = styled.View`
  height: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-right-width: 2px;
  border-right-color: ${({ theme }) => theme.colors.background_primary};
`;

export const TextInput = styled(Input)`
  flex: 1;
  width: 100%;
  height: 100%;

  padding: 0 23px;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme, editable }) =>
    editable ? theme.colors.title : theme.colors.text};
`;

export const ChangeSecurityButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
`;
