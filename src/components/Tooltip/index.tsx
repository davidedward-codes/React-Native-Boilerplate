import * as React from 'react';
import {
  Dimensions,
  View,
  LayoutChangeEvent,
  StyleSheet,
  Platform,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';
import styles from './styles';

type Props = {
  children: React.ReactElement;
  enterTouchDelay?: number;
  leaveTouchDelay?: number;
  title: string;
  titleMaxFontSizeMultiplier?: number;
};

const Tooltip = ({
  children,
  enterTouchDelay = 500,
  leaveTouchDelay = 1500,
  title,
  titleMaxFontSizeMultiplier,
}: Props) => {
  const isWeb = Platform.OS === 'web';
  const [visible, setVisible] = React.useState(false);
  const [measurement, setMeasurement] = React.useState({
    children: { pageX: 0, pageY: 0, width: 0, height: 0 },
    tooltip: { width: 0, height: 0 },
    measured: false,
  });

  const childrenWrapperRef = React.useRef<View>(null);
  const showTimer = React.useRef<NodeJS.Timeout | null>(null);
  const hideTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      showTimer.current && clearTimeout(showTimer.current);
      hideTimer.current && clearTimeout(hideTimer.current);
    };
  }, []);

  // Hide tooltip on screen rotation
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setVisible(false);
    });
    return () => subscription.remove();
  }, []);

  const showTooltip = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    
    showTimer.current = setTimeout(() => {
      setVisible(true);
    }, enterTouchDelay);
  };

  const hideTooltip = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      setMeasurement(prev => ({ ...prev, measured: false }));
    }, leaveTouchDelay);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setMeasurement(prev => ({
      ...prev,
      tooltip: { width, height },
    }));

    childrenWrapperRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setMeasurement(prev => ({
        ...prev,
        children: { pageX, pageY, width, height },
        measured: true,
      }));
    });
  };

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!measurement.measured) return {};
    
    const { children, tooltip } = measurement;
    return {
      top: children.pageY - tooltip.height - 8,
      left: children.pageX + (children.width - tooltip.width) / 2,
    };
  };

  return (
    <>
      {visible && (
        <View 
          style={[StyleSheet.absoluteFill, styles.root]} 
          pointerEvents="none"
        >
          <View
            onLayout={handleLayout}
            style={[
              styles.tooltip,
              getTooltipPosition(),
              measurement.measured ? styles.visible : styles.hidden,
            ]}
          >
            <Text
              numberOfLines={1}
              style={styles.text}
              maxFontSizeMultiplier={titleMaxFontSizeMultiplier}
            >
              {title}
            </Text>
          </View>
        </View>
      )}

      <Pressable
        ref={childrenWrapperRef}
        onPressIn={showTooltip}
        onPressOut={hideTooltip}
        style={styles.pressContainer}
      >
        {children}
      </Pressable>
    </>
  );
};

export default Tooltip;