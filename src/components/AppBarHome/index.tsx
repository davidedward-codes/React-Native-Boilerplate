import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

type AppbarHomeProps = {
  title: string;
  subtitle?: string;
  avatarSource?: string; 
  notificationCount?: number;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
  style?: ViewStyle;
  dark?: boolean;
};

const AppbarHome = ({
  title,
  subtitle,
  avatarSource,
  notificationCount = 0,
  onNotificationPress,
  onAvatarPress,
  style,
  dark = false
}: AppbarHomeProps) => {
  const backgroundColor = dark ? '#333' : '#fff';
  const textColor = dark ? '#fff' : '#333';
  const iconColor = dark ? '#fff' : '#333';

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {/* Left: User Avatar */}
      <TouchableOpacity onPress={onAvatarPress} style={styles.avatarContainer}>
        {avatarSource ? (
          <Image 
            source={ { uri: avatarSource } }
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: iconColor }]} />
        )}
      </TouchableOpacity>

      {/* Center: Title & Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: textColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right: Notification Icon */}
      <TouchableOpacity onPress={onNotificationPress} style={styles.notificationContainer}>
        <View style={[styles.bellIcon, { borderColor: iconColor }]}>
          <Text style={[styles.bellText, { color: iconColor }]}>🔔</Text>
          {notificationCount > 0 && (
            <View style={[styles.badge, { backgroundColor: dark ? '#ff4444' : '#ff0000' }]}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppbarHome;