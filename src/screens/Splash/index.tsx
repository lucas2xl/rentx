import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Wrapper } from './styles';

export const Splash = () => {
  const navigation = useNavigation();
  const splashAnimation = useSharedValue(0);

  const brandStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 0.5, 1], [1, 0.3, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 1],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 1],
            [-50, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(
      1,
      {
        duration: 1000,
      },
      () => {
        'worklet';
        runOnJS(startApp)();
      }
    );
  }, []);

  const startApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  return (
    <Wrapper>
      <Animated.View
        style={[brandStyles, { position: 'absolute', alignSelf: 'center' }]}
      >
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View
        style={[logoStyles, { position: 'absolute', alignSelf: 'center' }]}
      >
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Wrapper>
  );
};
