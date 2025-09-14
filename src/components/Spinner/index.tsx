import React from 'react';
import { View, StyleSheet } from 'react-native';
import TubeSpinner from './TubeSpinner';
import InfiniteSpinner from './InfiniteSpinner';
import FadeStaggerCircles from './FadeStaggerCircles';
import BouncingCircles from './BouncingCircles';
import AdvancedSpinner from './AdvancedSpinner';

type SpinnerType = 'tube' | 'infinite' | 'fade' | 'bouncing';

interface SpinnerProps {
  type?: SpinnerType;
  color?: string;
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ type = 'tube', color = '#007AFF', size = 50 }) => {
  const commonProps = { color, width: size, height: size };

  const renderSpinner = () => {
    switch (type) {
      case 'infinite':
        return <InfiniteSpinner {...commonProps} />;
      case 'fade':
        return <FadeStaggerCircles {...commonProps} />;
      case 'bouncing':
        return <BouncingCircles {...commonProps} />;
        case 'bouncing':
            return <AdvancedSpinner {...commonProps} />;
      case 'tube':
      default:
        return <TubeSpinner {...commonProps} />;
    }
  };

  return <View style={[styles.container, { width: size, height: size }]}>{renderSpinner()}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
