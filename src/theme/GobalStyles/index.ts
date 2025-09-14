import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    featuredCard: {
        margin: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      radio: {
        marginRight: 12,
      },
      label: {
        fontSize: 18,
      },
    carousel: {
        marginVertical: 16,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 8,
    },
    productCard: {
        width: '45%',
        marginBottom: 16,
    },
    productImage: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: 120,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
    },
    profileCard: {
        margin: 16,
    },
    settingsCard: {
        margin: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
    },
    button: {
        marginVertical: 8,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    cardContent: {
        marginBottom: 8,
        color: '#555',
    },
    publishDate: {
        color: '#666',
        fontSize: 12,
    },
    preferenceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    radioGroup: {
        marginBottom: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radioLabel: {
        marginLeft: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    snackbar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    dialog: {
        width: '90%',
        maxWidth: 400,
    },
    componentCard: {
        margin: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    componentButton: {
        margin: 4,
        minWidth: 100,
    },
    demoCard: {
        marginBottom: 16,
    },
    divider: {
        marginVertical: 16,
    },
    formInput: {
        marginBottom: 16,
    },
    dropdown: {
        marginBottom: 16,
    },
    checkboxGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        marginRight: 8,
    },
    slider: {
        marginVertical: 16,
        alignSelf: 'center',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    chip: {
        margin: 4,
    },
    smallChip: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    accordion: {
        marginBottom: 16,
    },
    tooltipTarget: {
        padding: 10,
        backgroundColor: '#e3f2fd',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    listAccordion: {
        marginBottom: 16,
    },
    dataTable: {
        marginBottom: 16,
    },
    calendar: {
        marginBottom: 16,
    },
    dateTimePicker: {
        marginBottom: 16,
    },
    smallFab: {
        position: 'relative',
        margin: 0,
    },
    topTabBar: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    settingLabel: {
        fontWeight: 'bold',
    },
    settingDescription: {
        color: '#666',
        fontSize: 12,
    },
    addToCartButton: {
        marginTop: 8,
    },
});

export default styles