import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    navButton: {
      fontSize: 24,
      paddingHorizontal: 16,
      color: '#3498db',
    },
    monthText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    weekDaysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
    },
    weekDayText: {
      width: 40,
      textAlign: 'center',
      fontWeight: '500',
      color: '#7f8c8d',
    },
    day: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 2,
      borderRadius: 20,
    },
    dayText: {
      fontSize: 16,
      color: '#000',
    },
    today: {
      backgroundColor: '#e1f5fe',
    },
    todayText: {
      color: '#039be5',
      fontWeight: 'bold',
    },
    selectedDay: {
      backgroundColor: '#3498db',
    },
    selectedDayText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    nonCurrentMonth: {
      opacity: 0.4,
    },
    nonCurrentMonthText: {
      color: '#95a5a6',
    },
  });

  export default styles