import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageSourcePropType,
  ViewStyle,
  ImageStyle
} from 'react-native';
import styles from './styles';

type AvatarProps = {
  source?: ImageSourcePropType;
  name?: string;
  size?: number;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  onPress?: () => void;
  badge?: number | boolean;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  badgeColor?: string;
  badgeTextColor?: string;
  shape?: 'circle' | 'square' | 'rounded';
  backgroundColor?: string;
  textColor?: string;
};

const Avatar = ({
  source,
  name,
  size = 48,
  style,
  imageStyle,
  onPress,
  badge,
  badgePosition = 'top-right',
  badgeColor = '#ff4444',
  badgeTextColor = 'white',
  shape = 'circle',
  backgroundColor = '#e0e0e0',
  textColor = '#333',
}: AvatarProps) => {
  // Get initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    
    return initials;
  };

  // Calculate badge position
  const getBadgePosition = () => {
    const positionMap = {
      'top-right': { top: -2, right: -2 },
      'top-left': { top: -2, left: -2 },
      'bottom-right': { bottom: -2, right: -2 },
      'bottom-left': { bottom: -2, left: -2 },
    };
    
    return positionMap[badgePosition];
  };

  // Border radius based on shape
  const borderRadius = shape === 'circle' 
    ? size / 2 
    : shape === 'rounded' 
      ? size / 4 
      : 0;

  const renderContent = () => {
    if (source) {
      return (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius,
            },
            imageStyle,
          ]}
        />
      );
    }
    
    return (
      <View
        style={[
          styles.initialsContainer,
          {
            width: size,
            height: size,
            borderRadius,
            backgroundColor,
          }
        ]}
      >
        <Text style={[styles.initials, { color: textColor, fontSize: size / 2 }]}>
          {getInitials()}
        </Text>
      </View>
    );
  };

  const renderBadge = () => {
    if (!badge) return null;
    
    const badgeSize = typeof badge === 'number' ? 20 : 12;
    const positionStyle = getBadgePosition();
    
    return (
      <View
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            backgroundColor: badgeColor,
            ...positionStyle,
          }
        ]}
      >
        {typeof badge === 'number' && (
          <Text style={[styles.badgeText, { color: badgeTextColor, fontSize: badgeSize * 0.6 }]}>
            {badge > 9 ? '9+' : badge}
          </Text>
        )}
      </View>
    );
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      onPress={onPress} 
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      {renderContent()}
      {renderBadge()}
    </Container>
  );
};

export default Avatar;