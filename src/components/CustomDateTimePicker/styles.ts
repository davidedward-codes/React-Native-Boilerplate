import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    dateContainer: {
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    dateItem: {
      width: width / 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 4,
    },
    selectedDateItem: {
      backgroundColor: '#4285F4',
    },
    dateText: {
      fontSize: 14,
      color: '#333',
      fontWeight: '500',
    },
    dateNum: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 4,
      color: '#222',
    },
    monthText: {
      fontSize: 12,
      color: '#666',
    },
    selectedDateText: {
      color: '#fff',
    },
    timeContainer: {
      padding: 10,
    },
    timeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    timeItem: {
      width: '23%',
      padding: 12,
      margin: 4,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    selectedTimeItem: {
      backgroundColor: '#4285F4',
    },
    disabledTimeItem: {
      backgroundColor: '#f9f9f9',
    },
    timeText: {
      fontSize: 16,
      color: '#333',
    },
    selectedTimeText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    disabledTimeText: {
      color: '#ccc',
    },
  });

  export default styles