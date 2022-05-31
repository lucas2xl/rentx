import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Wrapper, Header, Title, Subtitle, Form, Spacing } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export const SignIn = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('lucas@teste.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const textInputPassword = useRef<TextInput>(null);

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent
        />
        <KeyboardAvoidingView
          behavior="position"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{'\n'}uma experiência incrível
            </Subtitle>
          </Header>

          <Form>
            <Input
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              blurOnSubmit={false}
              onSubmitEditing={() => textInputPassword.current?.focus()}
            />

            <Spacing />

            <Input
              ref={textInputPassword}
              returnKeyType="go"
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
              autoCapitalize="none"
              isSecurity
              autoCorrect={false}
              autoComplete="off"
              onSubmitEditing={handleSignIn}
            />
          </Form>

          <Button
            title="Login"
            onPress={handleSignIn}
            enabled={!!email && password.length >= 8}
            loading={loading}
          />
        </KeyboardAvoidingView>

        <Spacing />
        <Button
          title="Criar conta gratuita"
          color={colors.background_secondary}
          textColor={colors.header}
          onPress={handleNewAccount}
        />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
