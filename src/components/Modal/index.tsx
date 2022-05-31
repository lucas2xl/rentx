import React from 'react';
import { Modal as ModalWrapper, useWindowDimensions } from 'react-native';
import { ConfirmButton } from '../ConfirmButton';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { useTheme } from 'styled-components';
import { Wrapper, BackGroundWrapper, Content, Title, Message } from './styles';

interface IProps {
  visible: boolean;
  title: string;
  message?: string;
  onPress: () => void;
}

export const Modal = ({ visible, title, message, onPress }: IProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <ModalWrapper
      animationType="slide"
      presentationStyle="pageSheet"
      visible={visible}
      hardwareAccelerated
      onRequestClose={onPress}
    >
      <Wrapper>
        <BackGroundWrapper>
          <LogoSvg width={width} color={colors.header} />
        </BackGroundWrapper>

        <Content>
          <DoneSvg width={80} height={80} color={colors.main} />
          <Title>{title}</Title>

          <Message>{message}</Message>

          <ConfirmButton title="Ok" onPress={onPress} />
        </Content>
      </Wrapper>
    </ModalWrapper>
  );
};
