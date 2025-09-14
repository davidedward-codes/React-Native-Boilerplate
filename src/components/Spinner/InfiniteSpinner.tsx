import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const InfiniteSpinner: React.FC<Props> = ({ color = '#007AFF', width = 38, height = 38 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={width} height={height} viewBox="0 0 38 38">
          <Path
            d="M36 19c0-9.4-7.6-17-17-17"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80"
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

export default InfiniteSpinner;
