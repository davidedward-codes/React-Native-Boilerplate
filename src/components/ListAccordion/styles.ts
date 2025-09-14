import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      marginBottom: 8,
      borderRadius: 8,
      backgroundColor: '#fff',
      elevation: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
    },
    icon: {
      fontSize: 14,
      color: '#666',
    },
    content: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
  });
export default styles  