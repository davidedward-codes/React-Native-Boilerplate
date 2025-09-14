import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 16,
    color: '#212529',
  },
  arrow: {
    fontSize: 12,
    color: '#6c757d',
  },
  list: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e9ecef',
    zIndex: 1000,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  itemText: {
    fontSize: 16,
    color: '#495057',
  },
  disabled: {
    backgroundColor: '#e9ecef',
    opacity: 0.7,
  },
});

export default styles