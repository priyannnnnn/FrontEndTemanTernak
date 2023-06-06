import React from 'react'
import StartBackground from '../components/StartBackground'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Text, StyleSheet } from 'react-native'
import { Image,  } from 'react-native'
import LogoStartScreen from '../components/LogoStartScreen'


export default function StartScreen({ navigation }) {
  return (
    <StartBackground >
      <LogoStartScreen/>
      {/* <Logo /> */}
      {/* <Header>Login Template</Header> */}
      {/* <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        MASUK
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        DAFTAR
      </Button>
      <Text style={Styles.Text}>
        Daftar jika Belum Punya Akun
      </Text>
    </StartBackground>
  )

}
  const Styles =StyleSheet.create({
    Text:{
      color :'#000000'
    }
  })
