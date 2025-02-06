import React, { useState,useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import axios from 'axios'
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'
// import {BASE_URL} from '@env'
// import {URL} from '@env'
import {BASE_URL} from '@env'
import {URL} from '@env'
import RegisterScreen from './RegisterScreen'
import { useNavigation } from '@react-navigation/native';


function LoginScreen() {
  const [email, setEmail] = useState({ value: '',error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const publicAxios = useContext(AxiosContext);
  const navigation = useNavigation();

  const onLoginPressed =async () => {
    if (loading) return; // Prevent double click
    setLoading(true)
    try{
      const dataLogin = {
        email:email?.value,
        password:password?.value
      }
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }
      console.log(`${BASE_URL}`)
      console.log(`${URL}/api/v1/login/email`,dataLogin)
      const response = await axios.post(`${URL}/api/v1/login/email`,dataLogin)
      const accessToken = response.data
      const refreshToken = response.data
      authContext.setAuthState({
        authenticated: true,
        refreshToken:refreshToken,
        accessToken:accessToken,
      });
       await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
        );
        setLoading(false)
        // navigation.navigate("Dashboard")
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }], // Ensure it resets properly
        });
    }catch(error){
      console.error(error)
      setLoading(false)
      Alert.alert('Failed', 'Pastikan username dan password Benar!')
    }
  }

  const Register =()=>{
    console.log("test")
    navigation.navigate('RegisterScreen')
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
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
      <Button mode="contained" loading={loading} onPress={onLoginPressed}>
        Login
      </Button>
      {/* <Button title={loading ? 'Logging in...' : 'Login'} onPress={onLoginPressed} disabled={loading} mode="contained" /> */}
      <View style={styles.row}>
        <Text>Tidak Punya Akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
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
    fontSize: 16
  },
  f:{
    flex:1,
    marginTop:40,
  },
  save:{
    flex:1
  }
})
