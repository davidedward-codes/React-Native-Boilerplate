import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    valueText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#1B6D66',
    },
    totalText: {
      fontSize: 20,
      color: '#999',
      marginLeft: 4,
    },
  });
  
export default styles