import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const TubeSpinner: React.FC<Props> = ({ color = '#007AFF', width = 50, height = 50 }) => {
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
        <Svg width={width} height={height} viewBox="0 0 50 50">
          <Rect x="20" y="10" width="10" height="30" rx="5" fill={color} />
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

export default TubeSpinner;
