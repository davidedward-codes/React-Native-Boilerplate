import React from 'react';
import { View, TouchableOpacity, Text, ViewStyle } from 'react-native';
import styles from './styles';

type AppbarProps = {
  children: React.ReactNode;
  dark?: boolean;
  style?: ViewStyle;
  onBack?: () => void;
};

const Appbar = ({ children, dark, style, onBack }: AppbarProps) => {
  return (
    <View 
      style={[
        styles.container, 
        dark ? styles.darkBackground : styles.lightBackground,
        style
      ]}
    >
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={dark ? styles.lightText : styles.darkText}>←</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

export default Appbar;