import * as React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';

interface CheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  color?: string;
  uncheckedColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Checkbox = ({
  status,
  disabled = false,
  onPress,
  color = '#008000', // Default checked color
  uncheckedColor = '#cccccc', // Default unchecked color
  style,
  testID,
}: CheckboxProps) => {
  const isChecked = status === 'checked';
  const isIndeterminate = status === 'indeterminate';

  const containerStyle = [
    styles.container,
    {
      borderColor: disabled ? '#999999' : (isChecked || isIndeterminate ? color : uncheckedColor),
      backgroundColor: isChecked || isIndeterminate ? color : 'transparent',
    },
    style,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={({ pressed }) => [
        containerStyle,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {isChecked && <View style={[styles.checkmark, disabled && styles.disabledCheck]} />}
      {isIndeterminate && <View style={[styles.indeterminate, disabled && styles.disabledCheck]} />}
    </Pressable>
  );
};

export default Checkbox;