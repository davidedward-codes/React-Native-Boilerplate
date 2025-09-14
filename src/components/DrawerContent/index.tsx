// src/components/DrawerLayout.tsx
import React from 'react';
import { 
  DrawerContentComponentProps, 
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

// Mock icon component - replace with your actual icon library
const Icon = ({ name, size = 24, color }: { name: string; size?: number; color: string }) => (
  <Text style={{ color, fontSize: size }}>{name}</Text>
);

// Custom Drawer Item Component
type DrawerItemProps = {
  icon?: string;
  label: string;
  isActive?: boolean;
  onPress?: () => void;
  rightView?: React.ReactNode;
};

const DrawerItem = ({ 
  icon, 
  label, 
  isActive = false, 
  onPress, 
  rightView 
}: DrawerItemProps) => {
  const { colors } = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: isActive 
            ? colors.primary 
            : pressed 
              ? `${colors.primary}20` 
              : 'transparent',
          borderRadius: 8,
        }
      ]}
    >
      <View style={styles.itemContent}>
        {icon && (
          <View style={styles.iconContainer}>
            <Icon 
              name={icon} 
              color={isActive ? colors.background : colors.text} 
              size={24} 
            />
          </View>
        )}
        
        <Text 
          style={[
            styles.label, 
            { 
              color: isActive ? colors.background : colors.text,
              fontWeight: isActive ? '600' : '400'
            }
          ]}
        >
          {label}
        </Text>
        
        {rightView && (
          <View style={styles.rightContainer}>
            {rightView}
          </View>
        )}
      </View>
    </Pressable>
  );
};

// Main Drawer Content Component
const DrawerContent = (props: DrawerContentComponentProps) => {
  const { colors } = useTheme();
  const activeRoute = props.state.routes[props.state.index].name;

  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: colors.card }}
    >
      <View style={styles.drawerHeader}>
        <Text style={[styles.headerText, { color: colors.text }]}>My App</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Music</Text>
        <DrawerItem
          icon="play-circle"
          label="Listen Now"
          isActive={activeRoute === 'Home'}
          onPress={() => props.navigation.navigate('Home')}
          rightView={<Text style={[styles.badge, { backgroundColor: colors.primary }]}>1</Text>}
        />
        <DrawerItem
          icon="atom"
          label="React Native"
          isActive={activeRoute === 'ReactNative'}
          onPress={() => props.navigation.navigate('ReactNative')}
        />
        <DrawerItem
          icon="alarm"
          label="Clock"
          isActive={activeRoute === 'Clock'}
          onPress={() => props.navigation.navigate('Clock')}
        />
      </View>

      {Platform.OS === 'android' && (
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Library</Text>
        <DrawerItem
          icon="microphone"
          label="Artists"
          isActive={activeRoute === 'Artists'}
          onPress={() => props.navigation.navigate('Artists')}
        />
        <DrawerItem
          icon="music"
          label="Songs"
          isActive={activeRoute === 'Songs'}
          onPress={() => props.navigation.navigate('Songs')}
        />
        <DrawerItem
          icon="monitor"
          label="TV & Movies"
          isActive={activeRoute === 'TV'}
          onPress={() => props.navigation.navigate('TV')}
        />
      </View>

      <View style={styles.footer}>
        <DrawerItem
          icon="cog"
          label="Settings"
          isActive={activeRoute === 'Settings'}
          onPress={() => props.navigation.navigate('Settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
};


export default DrawerContent;