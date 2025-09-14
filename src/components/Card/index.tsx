import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  Image,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import styles from './styles';

type CardProps = {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'contained';
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: () => void;  
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
};

const Card = ({
  children,
  variant = 'elevated',
  onPress,
  onLongPress,
  disabled = false,
  style,
  contentStyle,
  borderRadius = 8,
}: CardProps) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#e0e0e0',
        };
      case 'contained':
        return {
          backgroundColor: '#f5f5f5',
        };
      default:
        return {
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
    }
  };

  return (
    <View 
      style={[
        styles.container,
        getVariantStyle(),
        { borderRadius },  
        disabled && styles.disabled,
        style,
      ]}
    >
      {onPress || onLongPress ? (
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}  
          disabled={disabled}
          style={styles.pressable}
          android_ripple={{ color: '#f0f0f0', borderless: false }}
        >
          <View style={[styles.content, contentStyle]}>
            {children}
          </View>
        </Pressable>
      ) : (
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};

Card.Header = ({ 
  children, 
  style 
}: { 
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>  
}) => (
  <View style={[styles.header, style]}>
    {children}
  </View>
);

Card.Content = ({ 
  children, 
  style 
}: { 
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>  
}) => (
  <View style={[styles.cardContent, style]}>
    {children}
  </View>
);

Card.Footer = ({ 
  children, 
  style 
}: { 
  children: React.ReactNode; 
  style?: StyleProp<ViewStyle>  
}) => (
  <View style={[styles.footer, style]}>
    {children}
  </View>
);

Card.Cover = ({ 
  source, 
  style,
  resizeMode = 'cover',
}: { 
  source: ImageSourcePropType; 
  style?: StyleProp<ImageStyle>;  
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}) => (
  <Image 
    source={source} 
    style={[styles.cover, style]}
    resizeMode={resizeMode}
  />
);

export default Card;