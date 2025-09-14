import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#0C1419',
    borderRadius: 30,
    margin: 10,
    padding: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    minWidth: 80,
  },
  tabText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  activeText: {
    color: '#0C1419',
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default styles