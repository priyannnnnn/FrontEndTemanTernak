import React, { useState,useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios'
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../context/AxiosContext'
import { AuthContext } from '../context/AuthContext'


 function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

const authContext = useContext(AuthContext);
const publicAxios = useContext(AxiosContext);

  const onLoginPressed =async () => {
    try{
      const dataLogin={
        email:email?.value,
        password:password.value
      }
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }console.log(dataLogin)

      const response=await axios.post('http://139.162.6.202:8000/api/v1/login/email',dataLogin)

      console.log(response.data)

      const accessToken = response.data.token
      console.log('accesssToken=',accessToken)
      
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken
        }),
        navigation.navigate("Dashboard")
      );

      console.log("Keychain",accessToken)
      authContext.setAuthState({
        authenticated: true,
        accessToken: accessToken,
      });

    }catch(error){
      console.error(error)
    }


    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }
// const margin =height <380 ? 30:100;
  return (
    
    <Background>
      
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      
      <SafeAreaView style={styles.save}>
      <ScrollView style={styles.f}>
      <View style={styles.f}>
      <Header>Selamat Datang.</Header>
      
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Tidak Punya Akun? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Buat Akun</Text>
        </TouchableOpacity>
      </View>
    </View>
      </ScrollView>
      </SafeAreaView>
    </Background>
  )
}

export default LoginScreen;
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  f:{
    flex:1,
    marginTop:40,
  },
  save:{
    flex:1
  }
})
