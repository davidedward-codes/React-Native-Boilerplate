import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 12,
      margin: 4,
      alignSelf: 'flex-start',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      marginRight: 6,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
    closeButton: {
      marginLeft: 6,
      marginRight: -4,
    },
    closeIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#bdbdbd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeText: {
      color: 'white',
      fontSize: 16,
      lineHeight: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  export default styles