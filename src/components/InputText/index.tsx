import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureEntry?: boolean;
}

const InputText = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  secureEntry = false,
  ...props
}: InputTextProps) => {
  const [isSecure, setIsSecure] = useState(secureEntry);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            !!error && styles.errorInput,
            inputStyle,
            { paddingLeft: leftIcon ? 40 : 15 },
            { paddingRight: rightIcon || secureEntry ? 40 : 15 },
          ]}
          secureTextEntry={isSecure}
          placeholderTextColor="#999"
          {...props}
        />

        <View style={styles.rightIconsContainer}>
          {secureEntry && (
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
              <Ionicons
                name={isSecure ? 'eye-off' : 'eye'}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          )}
          
          {!secureEntry && rightIcon && (
            <View style={styles.icon}>{rightIcon}</View>
          )}
        </View>
      </View>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

export default InputText;