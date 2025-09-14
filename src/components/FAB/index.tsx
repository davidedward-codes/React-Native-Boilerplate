import React from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ActivityIndicator,
  Animated,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';
import styles from './styles';

type FABProps = {
  icon?: string;
  label?: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  visible?: boolean;
  loading?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  mode?: 'flat' | 'elevated';
  style?: ViewStyle;
};

const FAB = ({
  icon,
  label,
  onPress,
  disabled = false,
  visible = true,
  loading = false,
  color = '#fff',
  size = 'medium',
  mode = 'elevated',
  style
}: FABProps) => {
  // Animation for visibility
  const visibility = React.useRef(new Animated.Value(visible ? 1 : 0)).current;
  
  React.useEffect(() => {
    Animated.timing(visibility, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // Size calculations
  const sizes = {
    small: { width: 40, height: 40, iconSize: 18 },
    medium: { width: 56, height: 56, iconSize: 24 },
    large: { width: 96, height: 96, iconSize: 36 },
  };

  const { width, height, iconSize } = sizes[size];
  const isExtended = !!label;
  
  // Style configurations
  const baseStyle = {
    width: isExtended ? undefined : width,
    height,
    minWidth: width,
    backgroundColor: mode === 'elevated' ? '#6200ee' : 'transparent',
    borderRadius: height / 2,
    elevation: mode === 'elevated' ? 3 : 0,
    opacity: visibility,
    transform: [{ scale: visibility }],
  };

  return (
    <Animated.View style={[styles.container, baseStyle, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size={iconSize} color={color} />
          ) : icon ? (
            <Text style={[styles.icon, { color, fontSize: iconSize }]}>
              {icon}
            </Text>
          ) : null}
          
          {label && (
            <Text style={[styles.label, { color }]}>
              {label}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default FAB;