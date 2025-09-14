import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  color?: string;
  size?: number;
  borderWidth?: number;
  style?: object;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  color = '#007AFF',
  size = 24,
  borderWidth = 2,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.outerCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          borderColor: selected ? color : '#CCCCCC',
        },
        style,
      ]}
    >
      {selected && (
        <View
          style={[
            styles.innerCircle,
            {
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.3,
              backgroundColor: color,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};


export default RadioButton;