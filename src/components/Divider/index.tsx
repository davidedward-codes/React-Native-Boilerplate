import React from 'react';
import { View, StyleProp, ViewStyle, FlexAlignType } from 'react-native';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = '#e0e0e0',
  thickness = 1,
  spacing = 8,
  style,
}) => {
  const baseStyle: ViewStyle = {
    backgroundColor: color,
    alignSelf: 'stretch' as FlexAlignType,
  };

  const orientationStyle: ViewStyle = orientation === 'horizontal'
    ? { height: thickness }
    : { width: thickness };

  const marginStyle: ViewStyle = orientation === 'horizontal'
    ? { marginVertical: spacing }
    : { marginHorizontal: spacing };

  return (
    <View style={[baseStyle, orientationStyle, marginStyle, style]} />
  );
};

export default Divider;