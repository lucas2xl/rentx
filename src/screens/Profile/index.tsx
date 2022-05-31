import React, { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Wrapper,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
  Form,
  Spacing,
} from './styles';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { Modal } from '../../components/Modal';

interface IProps {}

export const Profile = ({}: IProps) => {
  const { user, signOut, update } = useAuth();
  const { colors } = useTheme();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [loading, setLoading] = useState(false);
  const [isShowUpdatedModal, setIsShowUpdatedModal] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const secondRef = useRef<TextInput>(null);
  const thirdRef = useRef<TextInput>(null);

  const handleSignOut = () => {
    signOut();
  };

  const handleChangeOption = (value: 'dataEdit' | 'passwordEdit') => {
    setOption(value);
  };

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await update({
        id: user.id,
        name,
        driver_license: driverLicense,
        password: newPassword,
        old_password: '',
        avatar: avatar,
      });

      setIsShowUpdatedModal(true);
    } catch (error) {
      Alert.alert('Ops!, não foi possivel atualizar os dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          <Header>
            <HeaderTop>
              <BackButton color={colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo
                resizeMode="contain"
                source={{
                  uri: avatar || undefined,
                }}
              />
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleChangeOption('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleChangeOption('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
          </Content>

          {option === 'dataEdit' && (
            <Section>
              <Form>
                <Input
                  returnKeyType="next"
                  value={''}
                  defaultValue={user.name}
                  onChangeText={setName}
                  iconName="user"
                  placeholder="Nome"
                  blurOnSubmit={false}
                  onSubmitEditing={() => secondRef.current?.focus()}
                />
                <Spacing />
                <Input
                  returnKeyType="next"
                  value={email}
                  defaultValue={user.email}
                  onChangeText={setEmail}
                  iconName="mail"
                  editable={false}
                />
                <Spacing />
                <Input
                  ref={secondRef}
                  value={driverLicense}
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  maxLength={11}
                />
              </Form>
              <Button
                title="Salvar alterações"
                onPress={handleUpdateUser}
                loading={loading}
              />
            </Section>
          )}

          {option === 'passwordEdit' && (
            <Section>
              <Form>
                <Input
                  returnKeyType="next"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  iconName="lock"
                  placeholder="Senha atual"
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  isSecurity
                  onSubmitEditing={() => secondRef.current?.focus()}
                />
                <Spacing />
                <Input
                  ref={secondRef}
                  returnKeyType="next"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  iconName="lock"
                  placeholder="Nova senha"
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  isSecurity
                  onSubmitEditing={() => thirdRef.current?.focus()}
                />
                <Spacing />
                <Input
                  ref={thirdRef}
                  returnKeyType="next"
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                  iconName="lock"
                  placeholder="Confirmar nova senha"
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  isSecurity
                />
              </Form>
              <Button
                title="Salvar alterações"
                onPress={() => {}}
                enabled={
                  !!currentPassword && !!newPassword && !!confirmNewPassword
                }
                loading={loading}
              />
            </Section>
          )}

          <Modal
            visible={isShowUpdatedModal}
            onPress={() => setIsShowUpdatedModal(false)}
            title="Perfil atualizado!"
          />
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
