import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    toast: {
      position: "absolute",
      left: "5%",
      right: "5%",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    top: {
      top: Platform.OS === "ios" ? 60 : 20,
    },
    bottom: {
      bottom: Platform.OS === "ios" ? 40 : 20,
    },
    success: {
      backgroundColor: "#4CAF50",
    },
    error: {
      backgroundColor: "#F44336",
    },
    info: {
      backgroundColor: "#2196F3",
    },
    warning: {
      backgroundColor: "#FF9800",
    },
    text: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
      flexShrink: 1,
    },
    icon: {
      color: "#fff",
      fontSize: 20,
      marginRight: 10,
      fontWeight: "bold",
    },
  });

  export default styles