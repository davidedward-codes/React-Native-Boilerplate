import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../../components/CustomBottomTabBar';
import HomeScreen from '../../screens/HomeScreen';
import { Icon } from 'react-native-vector-icons/Icon';
import ProfileScreen from '../../screens/ProfileScreen';
import ComponentsScreen from '../../screens/ComponentsScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const Tab = createBottomTabNavigator()
const TabNavigation = () => (
    <Tab.Navigator tabBar={props => (
        <CustomBottomTabBar
            {...props}
            icons={{
                Home: ({ color, size }) => <Icon name="home" color={color} size={size} />,
                Components: ({ color, size }) => <Icon name="widgets" color={color} size={size} />,
                Profile: ({ color, size }) => <Icon name="person" color={color} size={size} />,
                Settings: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
            }}
        />
    )}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Components" component={ComponentsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

export default TabNavigation