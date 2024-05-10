   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {Dashboard} from '../screens/main'
import { RegisterScreen } from '../screens/main'
const Tab =createBottomTabNavigator();

const Tabs = () => {
    return (
    <Tab.Navigator>
        <Tab.Screen name='Dashboard' component={Dashboard}/>
        <Tab.Screen name='RegisterScreen' component={RegisterScreen}/>
    </Tab.Navigator>
    )
};

export default Tabs;