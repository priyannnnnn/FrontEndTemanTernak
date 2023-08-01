import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {Dashboard} from '../screens'
import { RegisterScreen } from '../screens'
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