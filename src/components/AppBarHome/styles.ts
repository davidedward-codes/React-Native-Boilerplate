import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      height: 80,
    },
    avatarContainer: {
      marginRight: 16,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    avatarPlaceholder: {
      width: 40,
      height: 40,
      borderRadius: 20,
      opacity: 0.3,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 14,
      opacity: 0.7,
      marginTop: 4,
    },
    notificationContainer: {
      marginLeft: 16,
    },
    bellIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    bellText: {
      fontSize: 20,
    },
    badge: {
      position: 'absolute',
      top: -5,
      right: -5,
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  export default styles