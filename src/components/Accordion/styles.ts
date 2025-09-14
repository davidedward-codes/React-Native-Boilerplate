import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginVertical: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      flex: 1,
    },
    icon: {
      fontSize: 16,
      marginLeft: 10,
    },
    content: {
      overflow: 'hidden',
    },
    innerContent: {
      padding: 16,
      position: 'absolute',
      width: '100%',
    },
  });

  export default styles