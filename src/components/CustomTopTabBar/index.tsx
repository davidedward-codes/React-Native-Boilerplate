import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import styles from './styles';

interface Tab {
  id: string;
  title: string;
}

interface CustomTopTabBarProps {
  tabs: Tab[];
  onTabPress?: (tab: Tab) => void;
}

const CustomTopTabBar: React.FC<CustomTopTabBarProps> = ({ tabs, onTabPress }) => {
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useState(new Animated.Value(0))[0];
  const [tabWidth, setTabWidth] = useState(0);

  useEffect(() => {
    // Calculate tab width when dimensions change
    const screenWidth = Dimensions.get('window').width;
    setTabWidth(screenWidth / tabs.length);
  }, [tabs.length]);

  useEffect(() => {
    // Animate indicator when active tab changes
    Animated.timing(indicatorPosition, {
      toValue: activeTab * tabWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    if (onTabPress) {
      onTabPress(tabs[index]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.id}
            onPress={() => handleTabPress(index)}
            style={[styles.tab, activeTab === index && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab.title}</Text>
          </Pressable>
        ))}
      </View>
      
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{ translateX: indicatorPosition }],
          },
        ]}
      />
    </View>
  );
};

export default CustomTopTabBar;