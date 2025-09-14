import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import styles from './styles';

type IconButtonProps = {
  /** 
   * Icon to display (using text-based icon for simplicity)
   */
  icon: string;
  /**
   * Color of the icon
   */
  iconColor?: string;
  /**
   * Background color of the container
   */
  containerColor?: string;
  /**
   * Size of the icon
   * @default 24
   */
  size?: number;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Accessibility label for the button
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press
   */
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  /**
   * Test ID for testing purposes
   */
  testID?: string;
  /**
   * Whether to show a loading indicator
   */
  loading?: boolean;
};

const IconButton = ({
  icon,
  iconColor = '#000',
  containerColor = 'transparent',
  size = 24,
  accessibilityLabel,
  disabled = false,
  onPress,
  testID = 'icon-button',
  loading = false,
  style,
}: IconButtonProps) => {
  const buttonSize = size + 16; // Size + padding

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      testID={testID}
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: containerColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size={size} color={iconColor} />
      ) : (
        <Text style={[styles.icon, { color: iconColor, fontSize: size }]}>
          {icon}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;