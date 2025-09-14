import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

type Props = {
  onValueChange?: (value: boolean) => void;
};

const SWITCH_WIDTH = 60;
const SWITCH_HEIGHT = 30;
const KNOB_SIZE = 26;
const PADDING = 2;

const Switch: React.FC<Props> = ({ onValueChange }) => {
  const [isOn, setIsOn] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggleSwitch = () => {
    const newValue = !isOn;
    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsOn(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, SWITCH_WIDTH - KNOB_SIZE - PADDING],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <View
        style={[
          styles.switchContainer,
          { backgroundColor: isOn ? '#006666' : '#ccc' },
        ]}
      >
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [{ translateX }],
              borderColor: isOn ? '#006666' : '#ccc',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: 'center',
    padding: PADDING,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 2,
  },
});

export default Switch;