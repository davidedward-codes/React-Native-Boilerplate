import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0d1b2a', // Dark blue background
    },
    tabBar: {
      flexDirection: 'row',
      height: 50,
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    activeTab: {
      backgroundColor: 'rgba(29, 78, 216, 0.2)', // Semi-transparent blue
    },
    tabText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 14,
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 3,
      backgroundColor: '#1d4ed8', // Active blue color
    },
  });

  export default styles