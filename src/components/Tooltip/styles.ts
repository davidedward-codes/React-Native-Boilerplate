import { Platform, StyleSheet, ViewStyle } from "react-native";

const styles = StyleSheet.create({
    root: {
      zIndex: 9999,
    },
    tooltip: {
      position: 'absolute',
      backgroundColor: '#616161',
      borderRadius: 4,
      paddingHorizontal: 16,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
    },
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
    pressContainer: {
      alignSelf: 'flex-start',
      ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
    } as ViewStyle,
  });

export default styles