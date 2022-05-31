import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import * as Yup from 'yup';
import {
  Wrapper,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
  Spacing,
} from './styles';
import { useTheme } from 'styled-components';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { api } from '../../../services';
import { useAuth } from '../../../hooks/auth';

interface IProps {}
interface IParms {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpEndStep = ({}: IProps) => {
  const { register } = useAuth();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as IParms;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpCompleteModal, setIsSignUpCompleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const textInputConfirmPassword = useRef<TextInput>(null);
  const steps = [false, true];

  const titleHeight = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        titleHeight.value,
        [0, 0.3],
        [1, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            titleHeight.value,
            [0, 1],
            [0, -width],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const handleKeyboardOpen = (value: number) => {
    titleHeight.value = withTiming(value, {
      duration: 500,
    });
  };

  useEffect(() => {
    const keyboardShowEvent = Keyboard.addListener('keyboardWillShow', () =>
      handleKeyboardOpen(1)
    );

    const keyboardHideEvent = Keyboard.addListener('keyboardWillHide', () =>
      handleKeyboardOpen(0)
    );

    return () => {
      keyboardShowEvent.remove();
      keyboardHideEvent.remove();
    };
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        confirmPassword: Yup.string()
          .required('Confirmar senha é obrigatório')
          .oneOf([Yup.ref('password'), null], 'Senha não coincidem'),
        password: Yup.string()
          .required('A senha é obrigatória')
          .min(8, 'A senha deve conter no minímo 8 dígitos'),
      });

      await schema.validate({ password, confirmPassword });

      await register({
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password: password,
      });

      setIsSignUpCompleteModal(true);
    } catch (error) {
      console;
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer cadastro, verifique as credenciais'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackSignIn = () => {
    setIsSignUpCompleteModal(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Header>
          <BackButton />

          <Steps>
            {steps.map((step) => (
              <Bullet key={step.toString()} active={step} />
            ))}
          </Steps>
        </Header>

        <KeyboardAvoidingView
          behavior="position"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <Title style={titleStyle}>Crie sua{'\n'}conta.</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <Input
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
              blurOnSubmit={false}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              isSecurity
              onSubmitEditing={() => textInputConfirmPassword.current?.focus()}
            />

            <Spacing />

            <Input
              ref={textInputConfirmPassword}
              returnKeyType="go"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              iconName="lock"
              placeholder="Confirmar senha"
              blurOnSubmit={false}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              isSecurity
              onSubmitEditing={handleRegister}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            enabled={!!password && !!confirmPassword}
            loading={loading}
            color={colors.success}
          />
        </KeyboardAvoidingView>

        <Modal
          visible={isSignUpCompleteModal}
          onPress={handleBackSignIn}
          title="Conta criada!"
          message={`Agora é só fazer login\ne aproveitar`}
        />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
