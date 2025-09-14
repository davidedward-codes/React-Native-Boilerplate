import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    topSafeArea: {
      top: 0,
    },
    bottomSafeArea: {
      bottom: 0,
    },
    container: {
      margin: 8,
      padding: 14,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    topContainer: {
      marginTop: Platform.OS === 'android' ? 8 : 0,
    },
    bottomContainer: {
      marginBottom: Platform.OS === 'android' ? 8 : 0,
    },
    messageText: {
      fontSize: 14,
      flex: 1,
      marginRight: 8,
    },
    actionText: {
      fontSize: 14,
      fontWeight: "600",
    },
  });

  export default styles