import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Platform } from "react-native";
import styles from "./styles";

type ToastType = "success" | "error" | "info" | "warning";
type ToastPosition = "top" | "bottom";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  showToast: (
    message: string, 
    options?: {
      type?: ToastType,
      duration?: number,
      position?: ToastPosition
    }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastItem extends ToastProps {
  id: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  const showToast = (
    message: string, 
    options: {
      type?: ToastType,
      duration?: number,
      position?: ToastPosition
    } = {}
  ) => {
    const {
      type = "info",
      duration = 3000,
      position = "bottom"
    } = options;
    
    const id = Date.now().toString();
    
    setToasts(prev => [...prev, { id, message, type, duration, position }]);

    timersRef.current[id] = setTimeout(() => {
      hideToast(id);
    }, duration);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    delete timersRef.current[id];
  };

  useEffect(() => {
    return () => {
      // Clear all timers on unmount
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {toasts.map(toast => (
        <ToastItem 
          key={toast.id} 
          {...toast}
          onHide={() => hideToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

interface ToastItemProps extends ToastItem {
  onHide: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type = "info",
  position = "bottom",
  onHide
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(position === "top" ? -100 : 100)).current;

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(position === "top" ? -100 : 100);
    };
  }, []);

  const getIcon = () => {
    const icons = {
      success: "✓",
      error: "⚠",
      info: "ℹ",
      warning: "⚠"
    };
    return <Text style={styles.icon}>{icons[type]}</Text>;
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[type],
        styles[position],
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          zIndex: 1000,
        }
      ]}
    >
      {getIcon()}
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};
