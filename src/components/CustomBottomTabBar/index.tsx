import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import styles from './styles';

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

type CustomBottomTabBarProps = BottomTabBarProps & {
  icons: {
    [key: string]: React.FC<TabBarIconProps>;
  };
};

const CustomBottomTabBar = ({ state, descriptors, navigation, icons }: CustomBottomTabBarProps) => {
  const animationValues = useRef(state.routes.map(() => new Animated.Value(0))).current;
  
  useEffect(() => {
    state.routes.forEach((_, index: number) => {
      if (state.index === index) {
        Animated.spring(animationValues[index], {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animationValues[index], {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [state.index, animationValues, state.routes]);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: Route<string>, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const Icon = icons[route.name];
        const defaultLabel = options.title || route.name;

        // Handle all label types including functional labels
        const label = 
          typeof options.tabBarLabel === 'function'
            ? options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? '#0C1419' : 'white',
                position: 'below-icon',
                children: defaultLabel, // Added missing children property
              })
            : options.tabBarLabel || defaultLabel;

        const scale = animationValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        });

        const translateY = animationValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        });

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <Animated.View style={[
              isFocused ? styles.activeTab : null,
              { 
                transform: [{ scale }, { translateY }] 
              }
            ]}>
              {Icon && (
                <View style={styles.iconContainer}>
                  <Icon 
                    focused={isFocused} 
                    color={isFocused ? '#0C1419' : 'white'} 
                    size={24} 
                  />
                  {options.tabBarBadge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{options.tabBarBadge.toString()}</Text>
                    </View>
                  )}
                </View>
              )}
              {typeof label === 'string' || typeof label === 'number' ? (
                <Text style={[
                  styles.tabText, 
                  isFocused ? styles.activeText : null
                ]}>
                  {label}
                </Text>
              ) : (
                label
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;