import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Text } from 'react-native'
import { Image,  } from 'react-native'


export default function StartScreen({ navigation }) {
  return (
    <Background >
      
      {/* <Logo /> */}
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
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
      <Text>
        Daftar jika Belum Punya Akun
      </Text>
    </Background>
  )
}
