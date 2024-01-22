import React, { useState,useContext } from 'react'
import axios from "axios";
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { Text } from 'react-native-paper'
import Button from '../components/Button'

const Api =({navigation})=>{
    const [email, setEmail] = useState({ value: 'test_24@gmail.com', s: '' })
    const [password, setPassword] = useState({ value: '12345678', error: '' })

    const onLoginPressed =()=>{
        const dataLogin = {
            email:email?.value,
            password:password?.value
        }
        console.log(dataLogin)
        axios.post('http://192.168.65.3:8000/api/v1/login/email',dataLogin)
        .then(res => {
            console.log("token = ", res.data)
            navigation.navigate("Dashboard")
        })
        .catch(err =>{
            console.error("error ", err)
        }) 
    }
        return(
            <Background>
            <BackButton goBack={navigation.goBack} />
            <SafeAreaView style={styles.save}>
            <ScrollView style={styles.f}>
            <View style={styles.f}>
            <Header>Selamat Datang Login.</Header>
            
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
            
              
              <View>
              
             
              </View>
            </View>
          </View>
            </ScrollView>
            </SafeAreaView>
          </Background>
        )
        }
export default Api;
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