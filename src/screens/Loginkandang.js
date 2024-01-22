import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import axios from 'axios'

function Loginkandang({navigation}){
    const [email, setEmail] = useState({ value: 'test_24@gmail.com', s: '' })
    const [password, setPassword] = useState({ value: '12345678', error: '' })

    const onLoginPressed =()=>{
        const data = {
            email:email?.value,
            password:password?.value
        }
        axios.post('http://139.162.6.202:8000/api/v1/login/email',data)
        .then(res => {
            console.log("token = ", res.data)
            navigation.navigate("Dashboard")
        })
        .catch(err =>{
            console.log("error ", err)
        }) 
    }
    
    return(
    <Background>
      <BackButton goBack={navigation.goBack} />
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
        <TouchableOpacity onPress={() => navigation.navigate('DaftarPendapatanTelur')}>
          <Text style={styles.link}>Buat Akun</Text>
        </TouchableOpacity>
        <View>
        <Text>Tidak Punya111 Akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DaftarPendapatanTelur')}>
          <Text style={styles.link}>Buat Akun</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
      </ScrollView>
      </SafeAreaView>
    </Background>
  )
    
}
export default Loginkandang;
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