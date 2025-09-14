import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const BouncingCircles: React.FC<Props> = ({ color = '#007AFF', width = 120, height = 30 }) => {
  const translations = [useRef(new Animated.Value(0)).current,
                        useRef(new Animated.Value(0)).current,
                        useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = translations.map((translateY, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(translateY, {
            toValue: -10,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
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
            transform={[
              { translateY: translations[index] }
            ]}
          />
        ))}
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default BouncingCircles;
