import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from '../DrawerNavigation';

const Stack = createStackNavigator();

// Main Navigator
const MainNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerNavigation} />
    </Stack.Navigator>
);

export default MainNavigation