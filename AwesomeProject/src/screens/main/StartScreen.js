import React, { useCallback, useContext, useEffect, useState } from 'react'
import StartBackground from '../../components/StartBackground'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import { Text, StyleSheet } from 'react-native'
import { Image,  } from 'react-native'
import LogoStartScreen from '../../components/LogoStartScreen'
import { AuthContext } from '../../context/AuthContext'
import * as Keychain from 'react-native-keychain';
import LoginScreen from './LoginScreen';
import SplashScreen from 'react-native-splash-screen';
import Dashboard from './Dashboard'
import {
  StatusBar,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import RegisterScreen from './RegisterScreen'
import Api from './api'
import {Colors} from 'react-native/Libraries/NewAppScreen';

function StartScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    useEffect(()=>{
      SplashScreen.hide()
    },[])
  
  return (
  <SafeAreaView style={[Styles.container, backgroundStyle]}>
  <StatusBar
    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    backgroundColor={backgroundStyle.backgroundColor}
  />
  <Api />
</SafeAreaView>
  )
}
export default StartScreen;
  const Styles =StyleSheet.create({
    Text:{
      color :'#000000'
    },
    container: {
      flex: 1,
    },
  })
