import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    pressable: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    icon: {
      fontWeight: 'bold',
      marginRight: 8,
    },
    label: {
      fontWeight: '600',
      fontSize: 16,
    },
  });

  export default styles