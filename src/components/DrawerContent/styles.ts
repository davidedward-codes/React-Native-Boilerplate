import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    drawerHeader: {
      padding: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.1)',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    section: {
      marginVertical: 8,
      paddingHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    itemContainer: {
      marginVertical: 4,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    iconContainer: {
      width: 30,
      alignItems: 'center',
      marginRight: 15,
    },
    label: {
      fontSize: 16,
      flex: 1,
    },
    rightContainer: {
      marginLeft: 10,
    },
    badge: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      paddingHorizontal: 5,
    },
    divider: {
      height: 1,
      marginVertical: 15,
      marginHorizontal: 15,
    },
    footer: {
      marginTop: 'auto',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.1)',
    },
  });
  
  export default styles