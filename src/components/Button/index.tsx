import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  GestureResponderEvent
} from 'react-native';
import styles from './styles';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle
}: ButtonProps) => {
  // Determine button styles based on variant
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: '#6c757d' };
      case 'outline':
        return { 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#007bff'
        };
      default: // primary
        return { backgroundColor: '#007bff' };
    }
  };

  // Determine button size
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 30 };
      default: // medium
        return { paddingVertical: 10, paddingHorizontal: 20 };
    }
  };

  // Determine text color
  const getTextColor = () => {
    if (disabled) return '#6c757d';
    return variant === 'outline' ? '#007bff' : '#ffffff';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[
            styles.text,
            { color: getTextColor() },
            textStyle
          ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;