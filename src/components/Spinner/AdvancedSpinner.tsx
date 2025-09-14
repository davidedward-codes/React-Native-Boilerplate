import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AdvancedSpinner: React.FC<Props> = ({ color = '#E387FF', size = 200 }) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const dashOffset = useRef(new Animated.Value(0)).current;
  const dashArray = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Infinite rotation
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // stroke-dash animations (simulated with looped sequence)
    Animated.loop(
      Animated.sequence([
        Animated.timing(dashArray, {
          toValue: 400,
          duration: 750,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(dashArray, {
          toValue: 800,
          duration: 750,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dashOffset, {
          toValue: -200,
          duration: 750,
          useNativeDriver: false,
        }),
        Animated.timing(dashOffset, {
          toValue: -800,
          duration: 750,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg viewBox="0 0 800 800" width={size} height={size}>
          <AnimatedCircle
            cx="400"
            cy="400"
            r="200"
            fill="none"
            stroke={color}
            strokeWidth="50"
            strokeLinecap="round"
            strokeDasharray={dashArray.interpolate({
              inputRange: [1, 800],
              outputRange: ['1,800', '800,1'],
            })}
            strokeDashoffset={dashOffset}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdvancedSpinner;
