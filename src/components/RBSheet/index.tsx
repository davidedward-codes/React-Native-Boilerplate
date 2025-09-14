import React, { Component, ReactNode } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styles from './styles';

const SUPPORTED_ORIENTATIONS: Array<
  'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'
> = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

interface CustomStyles {
  wrapper?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  draggableIcon?: StyleProp<ViewStyle>;
  [key: string]: any;
}

export interface RBSheetProps {
  animationType?: 'none' | 'slide' | 'fade';
  height?: number;
  minClosingHeight?: number;
  openDuration?: number;
  closeDuration?: number;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  dragFromTopOnly?: boolean;
  closeOnPressBack?: boolean;
  keyboardAvoidingViewEnabled?: boolean;
  customStyles?: CustomStyles;
  onClose?: (props?: any) => void;
  onOpen?: (props?: any) => void;
  children?: ReactNode;
}

interface RBSheetState {
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  pan: Animated.ValueXY;
}

class RBSheet extends Component<RBSheetProps, RBSheetState> {
  static defaultProps: RBSheetProps = {
    animationType: 'none',
    height: 260,
    minClosingHeight: 0,
    openDuration: 300,
    closeDuration: 200,
    closeOnDragDown: false,
    dragFromTopOnly: false,
    closeOnPressMask: true,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === 'ios',
    customStyles: {},
    onClose: () => {},
    onOpen: () => {},
    children: <View />,
  };

  private panResponder!: PanResponderInstance;

  constructor(props: RBSheetProps) {
    super(props);

    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    this.createPanResponder(props);
  }

  setModalVisible = (visible: boolean, callbackProps?: any) => {
    const {
      height = 260,
      minClosingHeight = 0,
      openDuration = 300,
      closeDuration = 200,
      onClose,
      onOpen,
    } = this.props;
    const { animatedHeight, pan } = this.state;

    if (visible) {
      this.setState({ modalVisible: visible });
      if (typeof onOpen === 'function') {
        onOpen(callbackProps);
      }
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof onClose === 'function') {
          onClose(callbackProps);
        }
      });
    }
  };

  createPanResponder(props: RBSheetProps) {
    const { closeOnDragDown, height = 260 } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !!closeOnDragDown,
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
        }
      },
      onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  open = (callbackProps?: any) => {
    this.setModalVisible(true, callbackProps);
  };

  close = (callbackProps?: any) => {
    this.setModalVisible(false, callbackProps);
  };

  render() {
    const {
      animationType,
      closeOnDragDown,
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles = {},
      keyboardAvoidingViewEnabled,
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}>
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          behavior="padding"
          style={[styles.wrapper, customStyles.wrapper]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() =>
              closeOnPressBack ? this.setModalVisible(false) : this.setModalVisible(true)
            }
          />
          <Animated.View
            {...(!dragFromTopOnly && this.panResponder.panHandlers)}
            style={[panStyle, styles.container, { height: animatedHeight }, customStyles.container]}>
            {closeOnDragDown && (
              <View
                {...(dragFromTopOnly && this.panResponder.panHandlers)}
                style={styles.draggableContainer}>
                <View style={[styles.draggableIcon, customStyles.draggableIcon]} />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default RBSheet;
