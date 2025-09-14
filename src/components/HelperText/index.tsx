import React from 'react';
import { StyleProp, StyleSheet, TextStyle, Text } from 'react-native';
import styles from './styles';

type Props = {
  /**
   * Type of the helper text.
   */
  type?: 'error' | 'info';
  /**
   * Text content of the HelperText.
   */
  children: React.ReactNode;
  /**
   * Whether to display the helper text.
   */
  visible?: boolean;
  /**
   * Whether to apply padding to the helper text.
   */
  padding?: 'none' | 'normal';
  /**
   * Whether the text input tied with helper text is disabled.
   */
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  /**
   * TestID used for testing purposes
   */
  testID?: string;
};

const HelperText = ({
  style,
  type = 'info',
  visible = true,
  padding = 'normal',
  disabled = false,
  testID,
  children,
}: Props) => {
  if (!visible) return null;

  // Determine text color based on props
  const textColor = disabled 
    ? '#999999' 
    : type === 'error' 
      ? '#B00020' 
      : '#666666';

  return (
    <Text
      testID={testID}
      style={[
        styles.text,
        padding !== 'none' && styles.padding,
        { color: textColor },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default HelperText;