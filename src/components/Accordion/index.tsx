import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent
} from 'react-native';
import styles from './styles';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  duration?: number;
  icon?: React.ReactNode;
  expanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  containerStyle,
  headerStyle,
  titleStyle,
  contentStyle,
  duration = 300,
  icon,
  expanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleAccordion = () => {
    const finalValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: finalValue,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (contentHeight === 0) {
      setContentHeight(height);
      if (isExpanded) {
        animation.setValue(1);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleAccordion}
        style={[styles.header, headerStyle]}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          {icon || <Text style={styles.icon}>▼</Text>}
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            height: heightInterpolate,
            opacity: opacityInterpolate
          },
          contentStyle
        ]}
      >
        <View onLayout={handleContentLayout} style={styles.innerContent}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;