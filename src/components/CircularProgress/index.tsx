import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import styles from './styles';

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  radius?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  knobColor?: string;
  knobBorderColor?: string;
  knobRadius?: number;
  showText?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  totalStyle?: StyleProp<TextStyle>;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue = 100,
  radius = 80,
  strokeWidth = 15,
  color = '#2DB9A3',
  backgroundColor = '#E6E6E6',
  knobColor = '#ffffff',
  knobBorderColor = '#ccc',
  knobRadius,
  showText = true,
  containerStyle,
  valueStyle,
  totalStyle,
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const clampedValue = Math.min(Math.max(value, 0), maxValue);
  const strokeDashoffset = circumference - (clampedValue / maxValue) * circumference;

  // Calculate knob position
  const angle = (2 * Math.PI * clampedValue) / maxValue - Math.PI / 2;
  const knobX = radius + normalizedRadius * Math.cos(angle);
  const knobY = radius + normalizedRadius * Math.sin(angle);
  
  // Calculate knob size
  const calculatedKnobRadius = knobRadius ?? strokeWidth / 2;
  
  return (
    <View style={[styles.container, containerStyle, { width: radius * 2, height: radius * 2 }]}>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background Circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Arc */}
        <Circle
          stroke={color}
          fill="none"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${radius}, ${radius}`}
        />
        
        {/* Knob */}
        <Circle
          cx={knobX}
          cy={knobY}
          r={calculatedKnobRadius}
          fill={knobColor}
          stroke={knobBorderColor}
          strokeWidth={1}
        />
      </Svg>

      {/* Center Value - Conditionally rendered */}
      {showText && (
        <View style={[styles.textContainer, { width: '100%' }]}>
          <Text style={[styles.valueText, valueStyle]}>
            {clampedValue}
          </Text>
          <Text style={[styles.totalText, totalStyle]}>
            /{maxValue}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CircularProgress;