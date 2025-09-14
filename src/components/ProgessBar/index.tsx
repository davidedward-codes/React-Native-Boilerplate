import React from 'react';
import { View , StyleSheet ,ViewStyle } from 'react-native';

interface ProgressBarProps {
    progress : number;
    containerStyle?:ViewStyle;
    progressBarStyle?:ViewStyle;
    progressFillStyle?:ViewStyle;
  }

const ProgressBar : React.FC<ProgressBarProps> = ({containerStyle,progressBarStyle, progressFillStyle, progress }) => {
  return (
    <View style={[styles.container,containerStyle]}>
      <View style={[styles.progressBar,progressBarStyle]}>
        <View style={[styles.progressFill, progressFillStyle, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  dateText: { 
    fontSize: 16,
    marginHorizontal: 5,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});

export default ProgressBar;