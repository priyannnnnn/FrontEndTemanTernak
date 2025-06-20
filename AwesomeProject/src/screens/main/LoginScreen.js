import React, { useState, useContext } from 'react';
import {
  View, ScrollView, SafeAreaView, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import * as Keychain from 'react-native-keychain';
import { AxiosContext } from '../../context/AxiosContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { URL } from '@env';

const LoginScreen = () => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const navigation = useNavigation();

  const onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    try {
      const response = await publicAxios.post(`${URL}/api/v1/login/email`, {
        email: email.value,
        password: password.value,
      });

      const accessToken = response.data.token;
      const refreshToken = response.data.token;
      const user = response.data.user;

      const tokenData = {
        accessToken: { token: accessToken },
        refreshToken: { token: refreshToken },
        user: user
      };

      setAuthState({
        authenticated: true,
        ...tokenData,
      });

      await Keychain.setGenericPassword('token', JSON.stringify(tokenData));

      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', 'Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.save}>
        <ScrollView contentContainerStyle={styles.f}>
          <Header>Selamat Datang</Header>

          <TextInput
            label="Email"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <Button mode="contained" loading={loading} onPress={onLoginPressed}>
            Login
          </Button>

          <View style={styles.row}>
            <Text>Tidak punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.link}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 16,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  f: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  save: {
    flex: 1,
  },
});
