import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    image: {
      resizeMode: 'cover',
    },
    initialsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    initials: {
      fontWeight: 'bold',
    },
    badge: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      fontWeight: 'bold',
    },
  });

export default styles