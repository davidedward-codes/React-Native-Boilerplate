import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      width: 12,
      height: 6,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      borderColor: 'white',
      transform: [{ rotate: '-45deg' }],
      marginTop: -2,
    },
    indeterminate: {
      width: 12,
      height: 2,
      backgroundColor: 'white',
    },
    pressed: {
      opacity: 0.8,
    },
    disabled: {
      opacity: 0.5,
    },
    disabledCheck: {
      borderColor: '#f5f5f5',
      backgroundColor: '#f5f5f5',
    },
  });

  export default styles