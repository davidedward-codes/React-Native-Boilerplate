import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 56,
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  darkBackground: {
    backgroundColor: '#333333',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  lightText: {
    color: 'white',
    fontSize: 24,
  },
  darkText: {
    color: 'black',
    fontSize: 24,
  },
});

export default styles