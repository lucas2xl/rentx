import React, { useEffect, useState, useCallback, Context } from 'react';
import { StatusBar } from 'react-native';
import { Wrapper, Header, TotalCars, CarList, MyCarsButton } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services';
import Logo from '../../assets/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { CardTDO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { AnimationLoad } from '../../components/AnimationLoad';
import { useNetInfo } from '@react-native-community/netinfo';

export const Home = () => {
  const { colors } = useTheme();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [cars, serCars] = useState<CardTDO[]>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      await fetchCars();
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGesture = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },

    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },

    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCars();
    setRefreshing(false);
  }, []);

  const fetchCars = async () => {
    try {
      const { data } = await api.get('/cars');
      serCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardDetails = (car: CardTDO) => {
    navigation.navigate('CarDetails', { car });
  };

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars');
  };

  return (
    <Wrapper>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />

        {cars?.length && <TotalCars>Total de {cars?.length} carros</TotalCars>}
      </Header>

      {loading ? (
        <AnimationLoad />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.name)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCardDetails(item)} />
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: 'absolute', bottom: 13, right: 22 },
          ]}
        >
          <MyCarsButton onPress={handleOpenMyCars}>
            <Ionicons name="ios-car-sport" size={32} color={colors.shape} />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler> */}
    </Wrapper>
  );
};
