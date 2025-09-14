import DrawerContent from "../../components/DrawerContent";
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from "../TabNavigation";

const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigation = () => (
    <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
            headerShown: false,
            drawerType: 'slide',
            swipeEdgeWidth: 100,
        }}
    >
        <Drawer.Screen name="MainTabs" component={TabNavigation} />
    </Drawer.Navigator>
);

export default DrawerNavigation