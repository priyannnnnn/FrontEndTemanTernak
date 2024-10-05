import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import BackButton from '../../components/BackButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListKandang from './ListKandang'
import Ternak from '../farm_screens/livestock/Ternak'
import { theme } from '../../core/theme'
import AmountKandang from './AmountKandang'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboardkandang from './Dashboardkandang'

const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:'#E1F0DA'},
        headerTintColor:'#65B741',
        tabBarStyle:{backgroundColor:'#E1F0DA',height:70,position:'absolute',bottom:20, borderRadius:90, marginHorizontal:25 },
        //tabBarActiveBackgroundColor:'#EBF4FA',
      }}
      >
      <Tab.Screen name='Kandang'  component={AmountKandang} 
        options={{tabBarIcon : ({focused})=> (
          <View style={{alignItems:'center', justifyContent:'center', top:10}}>
            {/* <View style={styles.viewButton}>
              <TouchableOpacity onPress={() => navigation.navigate('DaftarOperasional')}><Text>yan</Text></TouchableOpacity>
            </View> */}
            <Image source={require('../../image/kandang.png')} 
              style={{ 
                width: 60,
                height: 60,
                marginBottom:20,
                tintColor: focused ? '#65B741' : '#65B741',
              }}/>
           {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Kandang</Text>  */}
          </View>
        )}}
        />
         <Tab.Screen name='dass'  component={Dashboardkandang} 
        options={{tabBarIcon : ({focused})=> (
          <View style={{alignItems:'center', justifyContent:'center', top:10}}>
            {/* <View style={styles.viewButton}>
              <TouchableOpacity onPress={() => navigation.navigate('DaftarOperasional')}><Text>yan</Text></TouchableOpacity>
            </View> */}
            <Image source={require('../../image/kandang.png')} 
              style={{ 
                width: 60,
                height: 60,
                marginBottom:20,
                tintColor: focused ? '#65B741' : '#65B741',
              }}/>
           {/* <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Kandang</Text>  */}
          </View>
        )}}
        />
      <Tab.Screen name='Akun' component={Ternak} options={{tabBarIcon: ({focused}) => (
          <View style={{alignItems:'center', justifyContent:'center', top:10}}>
              <AntDesign name="home" style={{color:'green',marginBottom:20, fontSize:40, tintColor: focused ? '#e32f45' : '#748c94',}}/>
          </View>
      )}}/>

    {/* <View style={styles.ff}>
    
    <Background>
      <BackButton goBack={navigation.goBack}/>
      {/* <Logo /> */}
      {/* <Header>Ayo Beternak</Header>
      <Paragraph >
        Selamat Datang Sahabat Peternak Milineal
      </Paragraph>
      <Button style={styles.color}
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'BuatKandang' }],
          })
        }
        >
        Buat Kandang
      </Button> */} 
      {/* <Text style={styles.Paragraph}>* Buat Kandang Jika belum Punya Kandang</Text>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'ListKandang' }],
          })
        }
        >
      Masuk Kandang
      </Button>

    </Background>
   
    </View> */}
        </Tab.Navigator>
   
  )
}
const styles=StyleSheet.create({
  ff:{
    flex:1
  },
  Paragraph:{
    fontSize:15,
    color :'#000000'
  },
  color:{
    color:'#164B60'
  },
  style:{
    position:'absolute', 
    bottom:25,
    right:20,
    elevation:0,
    backgroundColor:'#ffffff',
    borderRadius:15,
    height:90
  },
  viewButton: {
    height: 70,
    width: 70,
    backgroundColor:'#000000'
  }
 
})
