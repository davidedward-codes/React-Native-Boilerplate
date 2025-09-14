import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    label: {
      marginBottom: 5,
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
    },
    input: {
      height: 50,
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    errorInput: {
      borderColor: '#ff4d4f',
    },
    icon: {
      position: 'absolute',
      zIndex: 1,
      padding: 10,
    },
    rightIconsContainer: {
      position: 'absolute',
      right: 0,
      flexDirection: 'row',
    },
    error: {
      color: '#ff4d4f',
      fontSize: 12,
      marginTop: 5,
      marginLeft: 5,
    },
  });

export default styles