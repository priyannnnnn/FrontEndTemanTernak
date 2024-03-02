import React, { useCallback, useContext, useEffect, useState } from 'react'
import StartBackground from '../components/StartBackground'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Text, StyleSheet } from 'react-native'
import { Image,  } from 'react-native'
import LogoStartScreen from '../components/LogoStartScreen'
import { AuthContext } from '../context/AuthContext'
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
// import LoginScreen from './LoginScreen'
import {Colors} from 'react-native/Libraries/NewAppScreen';


function StartScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
  // const onSubmit= () => {

    // const loadJWT = (async () => {
    //   try{
    //     const value =await Keychain.getGenericPassword()
    //     const Jwt = JSON.parse(value.password);

    //     authContext.setAuthState({
    //       accessToken: Jwt.accessToken || null,
    //       authenticated: Jwt.accessToken !== null,
    //     });
        
    //     setStatus("succes")
    //   }catch(error){
    //     setStatus(error)
    //     console.log(`Keychain Error: ${error.message}`)
    //     authContext.setAuthState({
    //       accessToken: null,
    //       authenticated: false,
    //     })
    //   }
    // },[]);console.log(loadJWT)

    // useEffect (() =>{
    //   loadJWT();
    // },[loadJWT])
    // console.log("expired = ",authContext.accessToken)
    // console.log("token = ",authContext?.authState?.authenticated)
    // if(authContext?.authState?.authenticated === true){
    //   return (navigation.navigate('Dashboard'))
    // }else {
    //   return (navigation.navigate('LoginScreen'))
    // }
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    useEffect(()=>{
      SplashScreen.hide()
    },[])
  
  return (
  //   <StartBackground >
  //     <LogoStartScreen/>
  //     {/* <Logo /> */}
  //     {/* <Header>Login Template</Header> */}
  //     {/* <Paragraph>
  //       The easiest way to start with your amazing application.
  //     </Paragraph> */}
  //     <Button
  //       mode="contained"
  //       onPress={onSubmit}
  //     >
  //       MASUK
  //     </Button>
  //     <Button
  //       mode="outlined"
  //       onPress={() => navigation.navigate('RegisterScreen')}
  //     >
  //       DAFTAR
  //     </Button>
  //     <Text style={Styles.Text}>
  //       Daftar jika Belum Punya Akun
  //     </Text>
  //   </StartBackground>
  // )
  <SafeAreaView style={[Styles.container, backgroundStyle]}>
  <StatusBar
    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    backgroundColor={backgroundStyle.backgroundColor}
  />
  <LoginScreen />
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
