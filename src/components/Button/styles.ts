import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default styles  