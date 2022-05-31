import React from 'react';
import { Wrapper } from './styles';
import LottieView from 'lottie-react-native';
import animation_load from '../../assets/animation_load.json';

export const AnimationLoad = () => {
  return (
    <Wrapper>
      <LottieView
        source={animation_load}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
        speed={1}
      />
    </Wrapper>
  );
};
