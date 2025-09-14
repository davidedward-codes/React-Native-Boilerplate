import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginVertical: 10
    },
    image: {
      marginHorizontal: 20,
      borderRadius: 10
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4
    },
    activeDot: {
      backgroundColor: '#007AFF',
      width: 12
    },
    inactiveDot: {
      backgroundColor: '#CCCCCC'
    }
  });

  export default styles