import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignContent: 'center',
      paddingVertical: 12,
    },
    cell: {
      lineHeight: 24,
      fontSize: 12,
      fontWeight: '500',
      alignItems: 'center',
    },
    sorted: {
      marginLeft: 8,
    },
    icon: {
      height: 24,
      justifyContent: 'center',
    },
    right: {
      justifyContent: 'flex-end',
    },
    rowContainer: {
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
      minHeight: 48,
      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
    },
    cellContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    paginationContainer: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      flexWrap: 'wrap',
    },
    optionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
    },
    label: {
      fontSize: 12,
      marginRight: 16,
    },
    button: {
      textAlign: 'center',
      marginRight: 16,
    },
    iconsContainer: {
      flexDirection: 'row',
    },
    contentStyle: {
      flexDirection: 'row-reverse',
    },
    iconButton: {
      padding: 8,
    },
    menuContainer: {
      position: 'relative',
    },
    menu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: 'white',
      borderRadius: 4,
      elevation: 3,
      minWidth: 120,
      zIndex: 100,
    },
    menuItem: {
      padding: 8,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftText: {
      textAlign: 'left',
    },
    centerText: {
      textAlign: 'center',
    },
    rightText: {
      textAlign: 'right',
    },
  });

  export default styles