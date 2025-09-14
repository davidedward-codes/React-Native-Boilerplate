import React, {
    forwardRef,
    useState,
    useRef,
    useEffect,
    useCallback
  } from 'react';
  import {
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    GestureResponderEvent
  } from 'react-native';
  
  type TouchableDebounceProps = TouchableOpacityProps & {
    debounceTime?: number;
  };
  
  const TouchableDebounce = forwardRef<View, TouchableDebounceProps>(
    (props, ref) => {
      const {
        debounceTime = 500,
        onPress,
        disabled = false,
        children,
        ...rest
      } = props;
      
      const [isDisabled, setIsDisabled] = useState(disabled);
      const timerRef = useRef<NodeJS.Timeout | null>(null);
  
      // Sync with external disabled prop changes
      useEffect(() => {
        setIsDisabled(disabled);
      }, [disabled]);
  
      // Cleanup timer on unmount
      useEffect(() => {
        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      }, []);
  
      const handlePress = useCallback((event: GestureResponderEvent) => {
        if (isDisabled) return;
        
        // Immediately disable further presses
        setIsDisabled(true);
        
        // Execute user's onPress handler with the event
        onPress?.(event);
        
        // Set re-enable timeout
        timerRef.current = setTimeout(() => {
          setIsDisabled(false);
          timerRef.current = null;
        }, debounceTime);
      }, [onPress, debounceTime, isDisabled]);
  
      return (
        <TouchableOpacity
          ref={ref}
          onPress={handlePress}
          disabled={isDisabled}
          {...rest}
        >
          {children}
        </TouchableOpacity>
      );
    }
  );
  
  export default TouchableDebounce;