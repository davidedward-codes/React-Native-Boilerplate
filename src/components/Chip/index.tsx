import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import styles from './styles';

interface ChipProps {
  children: React.ReactNode;
  mode?: 'flat' | 'outlined';
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  selectedColor?: string;
  borderColor?: string;
  textColor?: string;
  testID?: string;
}

const Chip = ({
  children,
  mode = 'flat',
  icon,
  closeIcon,
  selected = false,
  disabled = false,
  onPress,
  onClose,
  style,
  textStyle,
  backgroundColor = '#e0e0e0',
  selectedColor = '#d1c4e9',
  borderColor = '#bdbdbd',
  textColor = '#212121',
  testID,
}: ChipProps) => {
  // Determine background color based on state
  const bgColor = disabled 
    ? '#f5f5f5' 
    : selected 
      ? selectedColor 
      : backgroundColor;

  // Determine border styling based on mode
  const borderStyles = mode === 'outlined' ? {
    borderWidth: 1,
    borderColor: disabled ? '#e0e0e0' : borderColor,
    backgroundColor: 'transparent',
  } : {};

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          opacity: disabled ? 0.6 : 1,
        },
        borderStyles,
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        disabled={disabled || !onPress}
        activeOpacity={0.7}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text 
          style={[
            styles.text,
            { color: disabled ? '#9e9e9e' : textColor },
            textStyle
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      </TouchableOpacity>

      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          disabled={disabled}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {closeIcon || (
            <View style={styles.closeIcon}>
              <Text style={styles.closeText}>×</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Chip;