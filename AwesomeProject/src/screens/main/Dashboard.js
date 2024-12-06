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
import FontAwesome from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashboardkandang from './Dashboardkandang'
import Account from './account'

const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:'#E1F0DA'},
        headerTintColor:'#65B741',
        tabBarStyle:{
          backgroundColor:'#E1F0DA',
          height:70,position:'absolute',
          bottom:20, 
          borderRadius:90, 
          marginHorizontal:25 
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight:'bold'
        },
      }}
      >
      <Tab.Screen 
        name='Dasboard' 
        component={AmountKandang} 
        options={{tabBarIcon : ({focused})=> (
          <View style={{alignItems:'center', justifyContent:'center', top:10}}>
            <FontAwesome name='home'
              style={{ 
                fontSize:40,
                marginBottom:5,
                color: focused ? '#997C70' : 'green',
              }}/>
          </View>
        ),
        tabBarLabel: 'Dasboard'
        }}
      />
         <Tab.Screen name='Kandang'  component={Dashboardkandang} 
        options={{tabBarIcon : ({focused})=> (
          <View style={{alignItems:'center', justifyContent:'center', top:10}}>
            <Image source={require('../../image/kandang.png')} 
              style={{ 
                width: 60,
                height: 60,
                marginBottom:20,
                // color: focused ? '#A52A2A' : 'green',
                tintColor: focused ? '#997C70' : 'green',
              }}
            />
          </View>
        )}}
        />
      <Tab.Screen 
      name= 'Akun' 
      component= {Account} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <View style={{alignItems:'center', justifyContent:'center', top:7}}>
              <Icon name="user-circle" 
                style={{
                  marginBottom:5,
                  fontSize:40,
                  color: focused ? '#997C70' : 'green',
                }}
              />
          </View>
      )}}/>
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
