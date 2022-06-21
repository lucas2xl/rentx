import React, { forwardRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import {
  Wrapper,
  IconWrapper,
  TextInput,
  ChangeSecurityButton,
} from './styles';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

interface IProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value: string;
  isSecurity?: boolean;
  editable?: boolean;
}

export const Input = forwardRef(
  (
    { iconName, value, isSecurity = false, editable = true, ...rest }: IProps,
    ref
  ) => {
    const { colors } = useTheme();
    const [security, setSecurity] = useState(isSecurity);
    const [isFocused, setIsFocused] = useState(false);

    const handleChangeSecurity = () => {
      setSecurity((previousState) => !previousState);
    };

    const handleChangeFocus = (value: boolean) => {
      setIsFocused(value);
    };

    return (
      <Wrapper isFocused={isFocused}>
        <IconWrapper>
          <Feather
            name={iconName}
            color={isFocused || value ? colors.main : colors.shape}
            size={24}
          />
        </IconWrapper>

        <TextInput
          onFocus={() => handleChangeFocus(true)}
          onBlur={() => handleChangeFocus(false)}
          secureTextEntry={security}
          ref={ref as any}
          placeholderTextColor={colors.shape}
          editable={editable}
          {...rest}
        />

        {isSecurity && (
          <ChangeSecurityButton onPress={handleChangeSecurity}>
            <Feather
              name={security ? 'eye' : 'eye-off'}
              color={colors.shape}
              size={24}
            />
          </ChangeSecurityButton>
        )}
      </Wrapper>
    );
  }
);
