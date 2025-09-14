import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Easing,
} from 'react-native';
import styles from './styles';

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Select an option',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const animation = useRef(new Animated.Value(0)).current;
  const dropdownRef = useRef<View>(null);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }, [isOpen]);

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 40]
  });

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container} ref={dropdownRef}>
      <TouchableOpacity 
        style={[styles.header, disabled && styles.disabled]}
        onPress={() => !disabled && setIsOpen(!isOpen)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text style={styles.headerText}>
          {selected ? selected.label : placeholder}
        </Text>
        
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Text style={styles.arrow}>▼</Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.list, { height: heightInterpolate }]}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.item}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.itemText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default CustomDropdown;