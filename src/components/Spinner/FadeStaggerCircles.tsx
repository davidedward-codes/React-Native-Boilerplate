import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const FadeStaggerCircles: React.FC<Props> = ({ color = '#007AFF', width = 120, height = 30 }) => {
  const opacities = [useRef(new Animated.Value(1)).current,
                     useRef(new Animated.Value(1)).current,
                     useRef(new Animated.Value(1)).current];

  useEffect(() => {
    const animations = opacities.map((opacity, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(anim => anim.start());
  }, []);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {[15, 60, 105].map((cx, index) => (
          <AnimatedCircle
            key={index}
            cx={cx}
            cy="15"
            r="10"
            fill={color}
            opacity={opacities[index]}
          />
        ))}
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default FadeStaggerCircles;
