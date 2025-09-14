import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      marginVertical: 8,
    },
    pressable: {
      flex: 1,
    },
    content: {},
    disabled: {
      opacity: 0.6,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardContent: {
      padding: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cover: {
      width: '100%',
      height: 200,
    },
  });

  export default styles