import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { Text, TextInput as PaperInput } from 'react-native-paper'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import { AxiosContext } from '../../context/AxiosContext'
import axios from 'axios'
import { URL } from '@env'

export default function RegisterScreen({ navigation }) {
  const axiosContext = useContext(AxiosContext);
  const [fullName, setFullName] = useState({ value: '', error: '' })
  const [nickName, setnickName] = useState({ value: '', error: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)

  const onSignUpPressed = () => {
    const nameError = nameValidator(fullName.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const data = {
      fullName: fullName?.value,
      nickName: nickName?.value,
      phoneNumber: phoneNumber?.value,
      email: email?.value,
      password: password?.value
    }
    if (emailError || passwordError || nameError) {
      setFullName({ ...fullName, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    setLoading(true)
    console.log(data)
    axios.post(`${URL}/api/v1/registration/phoneNumber`, data)
      .then(res => {
        setLoading(false)
        Alert.alert('Success', 'Registration successful', [
          { text: 'OK', onPress: () => navigation.navigate('LoginScreen', { name: 'LoginScreen' }) }
        ]);
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
        Alert.alert('Registration Failed', 'Something went wrong. Please try again.')
      })
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Buat Akun</Text>
          <Text style={styles.subHeaderText}>Silahkan lengkapi data diri Anda</Text>
        </View>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={fullName.value}
          onChangeText={(text) => setFullName({ value: text, error: '' })}
          error={!!fullName.error}
          errorText={fullName.error}
          style={styles.input}
          theme={inputTheme}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="#2D6A4F"
          left={<PaperInput.Icon icon="account-outline" color="#2D6A4F" />}
        />

        <TextInput
          label="Nick Name"
          returnKeyType="next"
          value={nickName.value}
          onChangeText={(text) => setnickName({ value: text, error: '' })}
          style={styles.input}
          theme={inputTheme}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="#2D6A4F"
          left={<PaperInput.Icon icon="account-circle-outline" color="#2D6A4F" />}
        />

        <TextInput
          label="Nomer Telepon"
          returnKeyType="next"
          value={phoneNumber.value}
          onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
          keyboardType="phone-pad"
          style={styles.input}
          theme={inputTheme}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="#2D6A4F"
          left={<PaperInput.Icon icon="phone-outline" color="#2D6A4F" />}
        />

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
          style={styles.input}
          theme={inputTheme}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="#2D6A4F"
          left={<PaperInput.Icon icon="email-outline" color="#2D6A4F" />}
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          style={styles.input}
          theme={inputTheme}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="#2D6A4F"
          left={<PaperInput.Icon icon="lock-outline" color="#2D6A4F" />}
        />

        <Button
          mode="contained"
          onPress={onSignUpPressed}
          loading={loading}
          style={styles.registerButton}
          labelStyle={styles.registerButtonLabel}
        >
          Daftar
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Sudah Punya Akun? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const inputTheme = {
  colors: {
    primary: '#2D6A4F',
    background: '#E8F5E9' // Light green background
  },
  roundness: 15,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80, // Space for header/back button
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D6A4F', // Natural green
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#9CA3AF', // Lighter grey
    textAlign: 'center',
  },
  input: {
    marginBottom: 12, // Airy spacing
    backgroundColor: '#E8F5E9',
  },
  registerButton: {
    borderRadius: 25, // Fully rounded
    backgroundColor: '#2D6A4F', // Natural green
    marginTop: 24,
    width: '100%',
    paddingVertical: 2,
  },
  registerButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: '#2D6A4F', // Natural green
  },
})
