import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  Dimensions
} from "react-native";
import styles from "./styles";

interface SnackbarProps {
  message: string;
  actionText?: string;
  onActionPress?: () => void;
  duration?: number;
  position?: "top" | "bottom";
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
  actionTextStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  actionTextColor?: string;
  visible?: boolean;
  onDismiss?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  actionText,
  onActionPress,
  duration = 3000,
  position = "bottom",
  containerStyle,
  messageStyle,
  actionTextStyle,
  backgroundColor = "#333",
  textColor = "#FFF",
  actionTextColor = "#FF9800",
  visible = true,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get('window').height;

  // Animation values based on position
  const hiddenPosition = position === "top" ? -windowHeight : windowHeight;
  const visiblePosition = position === "top" ? 0 : 0;

  const show = () => {
    setIsVisible(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visiblePosition,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: hiddenPosition,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsVisible(false);
        onDismiss?.();
      }
    });
  };

  useEffect(() => {
    if (visible) {
      show();
    } else {
      hide();
    }
  }, [visible]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        hide();
      }, duration);
    }
    return () => timer && clearTimeout(timer);
  }, [isVisible, duration]);

  const handleActionPress = () => {
    onActionPress?.();
    hide();
  };

  if (!isVisible) return null;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        position === "top" ? styles.topSafeArea : styles.bottomSafeArea,
      ]}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          styles.container,
          position === "top" ? styles.topContainer : styles.bottomContainer,
          containerStyle,
          {
            backgroundColor,
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text
          style={[styles.messageText, messageStyle, { color: textColor }]}
          numberOfLines={3}
        >
          {message}
        </Text>
        {actionText && (
          <TouchableOpacity onPress={handleActionPress}>
            <Text
              style={[
                styles.actionText,
                actionTextStyle,
                { color: actionTextColor },
              ]}
            >
              {actionText}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default Snackbar;