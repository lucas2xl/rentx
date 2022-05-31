import { useNavigation } from '@react-navigation/native';
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
import * as Yup from 'yup';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IProps {}

export const SignUpFirstStep = ({}: IProps) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const textInputEmail = useRef<TextInput>(null);
  const textInputDriveLicense = useRef<TextInput>(null);
  const steps = [true, false];

  const titleHeight = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => {
    return {
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

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('a CNH é obrigatória')
          .length(11, 'CNH inválida'),
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ email, name, driverLicense });

      navigation.navigate('SignUpEndStep', {
        user: {
          name,
          driverLicense,
          email,
        },
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais'
      );
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButton />

        <Steps>
          {steps.map((step) => (
            <Bullet key={step.toString()} active={step} />
          ))}
        </Steps>
      </Header>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="position"
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <Title style={titleStyle}>Crie sua{'\n'}conta.</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              returnKeyType="next"
              value={name}
              onChangeText={setName}
              iconName="user"
              placeholder="Nome"
              blurOnSubmit={false}
              onSubmitEditing={() => textInputEmail.current?.focus()}
            />

            <Spacing />

            <Input
              ref={textInputEmail}
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
              onSubmitEditing={() => textInputDriveLicense.current?.focus()}
            />

            <Spacing />

            <Input
              ref={textInputDriveLicense}
              value={driverLicense}
              onChangeText={setDriverLicense}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              maxLength={11}
            />
          </Form>
          <Button
            title="Próximo"
            onPress={handleNextStep}
            enabled={!!email && !!driverLicense && !!name}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
};
