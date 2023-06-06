import React from 'react'
// import { Provider } from 'react-native-paper'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import BuatKandang from './src/screens/BuatKandang';
import ListKandang  from './src/screens/ListKandang'
import PendapatanTelur from './src/screens/screensListkandang/PendapatanTelur'
import Ternak from './src/screens/screensListkandang/Ternak'
import PersediaanPakan from './src/screens/screensListkandang/PersediaanPakan'
import Pengurangan from './src/screens/screensListkandang/Pengurangan'
import PenggunaanPakan from './src/screens/screensListkandang/PenggunaanPakan'
import BiayaOperasional from './src/screens/screensListkandang/BiayaOperasional'
import DaftarPendapatanTelur from './src/screens/DaftarScreen/DaftarPendapatanTelur'
import DaftarTernak from './src/screens/DaftarScreen/DaftarTernak'
import penjumlahan from './src/screens/screensListkandang/Penjualan'
import DaftarPersediaanPakan from './src/screens/DaftarScreen/DaftarPersediaanPakan'
import DaftarPengurangan from './src/screens/DaftarScreen/DaftarPengurangan'
import DaftarPenggunaanPakan from './src/screens/DaftarScreen/DaftarPenggunaanPakan'
import DaftarPenjualanTelur from './src/screens/DaftarScreen/DaftarPenjualanTelur'
import UpdatePakan from './src/helpers/screenUpdate/UpdatePakan'
import UpdatePendapatanTelur from './src/helpers/screenUpdate/UpdatePndptanTelur'
import UpdatePenjualanTeur from './src/helpers/screenUpdate/UpdatePnjualanTelur'
import UpdateTernak from './src/helpers/screenUpdate/UpdateTernak'





const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
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
          <Stack.Screen name='PenggunaanPakan' component={PenggunaanPakan}/>
          <Stack.Screen name='Pengurangan' component={Pengurangan}/>
          <Stack.Screen name='PersediaanPakan' component={PersediaanPakan}/>
          <Stack.Screen name='Ternak' component={Ternak}/>
          <Stack.Screen name='Penjualan' component={penjumlahan}/>
          <Stack.Screen name='DaftarPendapatanTelur' component={DaftarPendapatanTelur}/>
          <Stack.Screen name='DaftarTernak' component={DaftarTernak}/>
          <Stack.Screen name='DaftarPersediaanPakan' component={DaftarPersediaanPakan}/>
          <Stack.Screen name='DaftarPengurangan' component={DaftarPengurangan}/>
          <Stack.Screen name='DaftarPenggunaanPakan' component={DaftarPenggunaanPakan}/>
          <Stack.Screen name='DaftarPenjualanTelur' component={DaftarPenjualanTelur}/>
          <Stack.Screen name='UpdatePakan' component={UpdatePakan}/>
          <Stack.Screen name='UpdatePendapatanTelur' component={UpdatePendapatanTelur}/>
          <Stack.Screen name='UpdatePenjualanTelur' component={UpdatePenjualanTeur}/>
          <Stack.Screen name='UpdateTernak' component={UpdateTernak}/>

          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
