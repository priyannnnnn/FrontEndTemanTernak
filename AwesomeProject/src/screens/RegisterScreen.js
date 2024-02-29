import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import { AxiosContext } from '../context/AxiosContext'

export default function RegisterScreen({ navigation }) {
  const axiosContext = useContext(AxiosContext);
  const [name, setName] = useState({ value: '', error: '' })
  const [nickName, setnickName] = useState({ value: '', error: '' })
  const [numberPhone, setnumberPhone]= useState({value: '', error: ''})
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const data={
      name: name?.value,
      nickName:nickName?.value,
      numberPhone:numberPhone?.value,
      email: email?.value,
      password: password?.value
    }
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    axiosContext.authAxios.post('/api/v1/registration/password', data)
    .then(res => {
      navigation.navigate('StartScreen', {name: 'StartScreen'})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
   
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Logo /> */}
      <Header>Create Account</Header>
      <View>  
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        />
        </View>
      <TextInput label="nick name" onChangeText={(text) => setnickName ({value:text, error:''})}/>
      <TextInput label="Nomer Telepon" onChangeText={(text) => setnumberPhone ({value:text, error:''})}/>
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Daftar
      </Button>
      <View style={styles.row}>
        <Text>Sudah Punya Akun? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </Background>

  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  ScrollView:{
  flex:1,
    backgroundColor:theme.colors.backgroundColor,
  }
})
