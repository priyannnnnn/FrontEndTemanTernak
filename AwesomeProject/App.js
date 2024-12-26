/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  // Loginkandang,
} from './src/screens/main'
// import BuatKandang from '../src/screens/BuatKandang';
import BuatKandang from './src/screens/main/BuatKandang';
import ListKandang  from './src/screens/main/ListKandang'
import PendapatanTelur from './src/screens/farm_screens/Incomee_egg/PendapatanTelur'
import Ternak from './src/screens/farm_screens/livestock/Ternak'
import PersediaanPakan from './src/screens/farm_screens/feed/PersediaanPakan'
import Pengurangan from './src/screens/screensListkandang/Pengurangan'
import PenggunaanPakan from './src/screens/screensListkandang/PenggunaanPakan'
import BiayaOperasional from './src/screens/farm_screens/operation/BiayaOperasional'
import DaftarPendapatanTelur from './src/screens/farm_screens/Incomee_egg/DaftarPendapatanTelur'
import DaftarTernak from './src/screens/farm_screens/livestock/DaftarTernak'
import penjumlahan from './src/screens/farm_screens/sale_egg/Penjualan'
import DaftarPersediaanPakan from './src/screens/farm_screens/feed/DaftarPersediaanPakan'
import DaftarPenjualanTelur from './src/screens/farm_screens/sale_egg/DaftarPenjualanTelur'
import UpdatePakan from './src/screens/farm_screens/feed/UpdatePakan'
import UpdatePendapatanTelur from './src/screens/farm_screens/Incomee_egg/UpdatePndptanTelur'
import UpdatePenjualanTelur from './src/screens/farm_screens/sale_egg/UpdatePnjualanTelur'
import UpdateTernak from './src/screens/farm_screens/livestock/UpdateTernak'
import { AuthProvider } from './src/context/AuthContext';
import { AxiosProvider } from './src/context/AxiosContext';
import DaftarOperasional from './src/screens/farm_screens/operation/DaftarOperasional';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AmountKandang from './src/screens/main/AmountKandang';
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import Api from './src/screens/main/api';
import IncomeEgg from './src/screens/screensListkandang/IncomeEgg';
import expost from './src/screens/screensListkandang/expost';
import UpdateOperasional from './src/screens/farm_screens/operation/UpdateOperasional';
import Dashboardkandang from './src/screens/main/Dashboardkandang';
import FeedUse from './src/screens/farm_screens/feeds_use/FeedsUse';
import ListFeedsUse from './src/screens/farm_screens/feeds_use/ListFeedsUse';
import UpdateFeedsUse from './src/screens/farm_screens/feeds_use/UpdateFeedsUse';
import QuailReduction from './src/screens/farm_screens/quail_reduction/Quailreduction';
import ListQuailReduction from './src/screens/farm_screens/quail_reduction/ListQuailReduction';
import UpdateQuailReduction from './src/screens/farm_screens/quail_reduction/UpdateQuailReduction';
import Account from './src/screens/main/account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <AuthProvider>
        <AxiosProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="StartScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name='BuatKandang' component={BuatKandang}/>
              <Stack.Screen name='ListKandang' component={ListKandang} />
              <Stack.Screen name='PendapatanTelur' component={PendapatanTelur}/>
              <Stack.Screen name='BiayaOperasional' component={BiayaOperasional}/>
              <Stack.Screen name='ListOperational' component={DaftarOperasional}/>
              <Stack.Screen name='PenggunaanPakan' component={PenggunaanPakan}/>
              <Stack.Screen name='Pengurangan' component={Pengurangan}/>
              <Stack.Screen name='PersediaanPakan' component={PersediaanPakan}/>
              <Stack.Screen name='Ternak' component={Ternak}/>
              <Stack.Screen name='Penjualan' component={penjumlahan}/>
              <Stack.Screen name='DaftarPendapatanTelur' component={DaftarPendapatanTelur}/>
              <Stack.Screen name='DaftarTernak' component={DaftarTernak}/>
              <Stack.Screen name='DaftarPersediaanPakan' component={DaftarPersediaanPakan}/>
              {/* <Stack.Screen name='DaftarPengurangan' component={DaftarPengurangan}/> */}
              {/* <Stack.Screen name='DaftarPenggunaanPakan' component={DaftarPenggunaanPakan}/> */}
              <Stack.Screen name='DaftarPenjualanTelur' component={DaftarPenjualanTelur}/>
              <Stack.Screen name='UpdatePakan' component={UpdatePakan}/>
              <Stack.Screen name='UpdatePendapatanTelur' component={UpdatePendapatanTelur}/>
              <Stack.Screen name='UpdatePenjualanTelur' component={UpdatePenjualanTelur}/>
              <Stack.Screen name='UpdateTernak' component={UpdateTernak}/>
              {/* <Stack.Screen name='AuthProvider' component={AuthProvider}/> */}
              <Stack.Screen name='AmountKandang' component={AmountKandang}/>
              <Stack.Screen name='Api' component={Api}/>
              <Stack.Screen name='IncomeEgg' component={IncomeEgg}/>
              <Stack.Screen name='ExPost' component={expost}/>
              <Stack.Screen name='UpdateOperasional' component={UpdateOperasional}/>
              {/* <Stack.Screen name='loginkandang' component={Loginkandang}/> */}
              <Stack.Screen name='Dashboardkandang' component={Dashboardkandang}/>
              <Stack.Screen name='FeedUse' component={FeedUse}/>
              <Stack.Screen name='ListFeedsUse' component={ListFeedsUse}/>
              <Stack.Screen name='UpdateFeedsUse' component={UpdateFeedsUse}/>
              <Stack.Screen name='ListQuailReduction' component={ListQuailReduction}/>
              <Stack.Screen name='QuailReduction' component={QuailReduction}/>
              <Stack.Screen name='UpdateQuailReduction' component={UpdateQuailReduction}/>
              <Stack.Screen name='Account' component={Account}/>

              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
              
            </Stack.Navigator>
          </NavigationContainer>
      </AxiosProvider>
      </AuthProvider>
    </Provider>
  )
}
AppRegistry.registerComponent(appName, () => App);