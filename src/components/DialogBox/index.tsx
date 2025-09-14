import * as React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  SafeAreaView,
  StyleProp,
} from 'react-native';
import styles from './styles';

interface DialogBoxProps {
  dismissable?: boolean;
  dismissableBackButton?: boolean;
  onDismiss?: () => void;
  visible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// Type for components that accept style props
type StylableComponentProps = {
  style?: StyleProp<ViewStyle | TextStyle>;
};

const DialogBox = (props: DialogBoxProps) => {
  const { children, visible, onDismiss, style, testID } = props;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      testID={testID}
    >
      <SafeAreaView style={styles.backdrop}>
        <View style={[styles.container, style]}>
          {React.Children.map(children, (child, index) => {
            // Type-safe handling of first child
            if (index === 0 && React.isValidElement(child)) {
              const currentStyle = (child.props as StylableComponentProps).style;
              return React.cloneElement(child, {
                style: [currentStyle, { marginTop: 8 }]
              } as Partial<StylableComponentProps>);
            }
            return child;
          })}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// Sub-components with proper TypeScript interfaces
interface DialogTitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

DialogBox.Title = ({ children, style }: DialogTitleProps) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

interface DialogContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

DialogBox.Content = ({ children, style }: DialogContentProps) => (
  <View style={[styles.content, style]}>{children}</View>
);

interface DialogActionsProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

DialogBox.Actions = ({ children, style }: DialogActionsProps) => (
  <View style={[styles.actions, style]}>{children}</View>
);

interface DialogScrollAreaProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

DialogBox.ScrollArea = ({ children, style }: DialogScrollAreaProps) => (
  <View style={[styles.scrollArea, style]}>{children}</View>
);

interface DialogIconProps {
  icon: string;
  color?: string;
  size?: number;
}

DialogBox.Icon = ({ icon, color = '#666', size = 24 }: DialogIconProps) => (
  <View style={styles.iconWrapper}>
    <Text style={{ color, fontSize: size }}>{icon}</Text>
  </View>
);


export default DialogBox;