import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '80%',
      backgroundColor: '#FFF',
      borderRadius: 8,
      elevation: 24,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    content: {
      paddingVertical: 16,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
      gap: 8,
    },
    scrollArea: {
      maxHeight: 200,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#EEE',
    },
    iconWrapper: {
      alignItems: 'center',
      marginBottom: 16,
    },
  });

  export default styles