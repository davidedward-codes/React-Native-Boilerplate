import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styles from './styles';

// Types for TypeScript
type ListAccordionProps = {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  id?: string | number;
  style?: StyleProp<ViewStyle>;
};

type ListAccordionGroupProps = {
  children: React.ReactNode;
  expandedId?: string | number;
  onAccordionPress?: (expandedId: string | number) => void;
};

// Context for group functionality
const ListAccordionGroupContext = createContext<{
  expandedId?: string | number;
  onAccordionPress?: (id: string | number) => void;
} | null>(null);

const ListAccordion = ({
  title,
  children,
  expanded,
  onPress,
  id,
  style,
}: ListAccordionProps) => {
  const groupContext = useContext(ListAccordionGroupContext);
  const [internalExpanded, setInternalExpanded] = useState(false);

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    
    if (groupContext) {
      groupContext.onAccordionPress?.(id!);
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const isExpanded = groupContext
    ? groupContext.expandedId === id
    : expanded ?? internalExpanded;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.header}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

const ListAccordionGroup = ({
    children,
    expandedId,
    onAccordionPress,
  }: ListAccordionGroupProps) => {
    const [internalExpandedId, setInternalExpandedId] = useState<string | number>();
  
    const handleAccordionPress = (id: string | number) => {
      onAccordionPress?.(id);
      
      if (expandedId === undefined) {
        setInternalExpandedId(current => current === id ? undefined : id);
      }
    };
  
    return (
      <ListAccordionGroupContext.Provider
        value={{
          expandedId: expandedId ?? internalExpandedId,
          onAccordionPress: handleAccordionPress
        }}
      >
        {children}
      </ListAccordionGroupContext.Provider>
    );
  };
  
  export { ListAccordion, ListAccordionGroup };