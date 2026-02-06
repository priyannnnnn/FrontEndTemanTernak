import React, { useState, useContext } from 'react';
import {
  View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image, Dimensions
} from 'react-native';
import { Text, Checkbox, TextInput as PaperInput } from 'react-native-paper';
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
  const [rememberMe, setRememberMe] = useState(false);
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
    console.log("env = ", URL)
    try {
      const response = await publicAxios.post(`${URL}/api/v1/login/email`, {
        email: email.value,
        password: password.value,
      });
      console.log("url = ", response)
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Top Header Image */}
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../../assets/1234.jpg')}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* Content Section with Curve */}
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.headerText}>Selamat Datang</Text>
            <Text style={styles.subHeaderText}>Login ke akun Anda</Text>
          </View>

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
            theme={{
              colors: {
                primary: styles.primaryColor.color,
                background: '#E8F5E9' // Light green background
              },
              roundness: 15,
            }}
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
            theme={{
              colors: {
                primary: styles.primaryColor.color,
                background: '#E8F5E9' // Light green background
              },
              roundness: 15,
            }}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="#2D6A4F"
            left={<PaperInput.Icon icon="lock-outline" color="#2D6A4F" />}
          />

          {/* Remember Me & Forgot Password Row */}
          <View style={styles.optionsRow}>
            <View style={styles.rememberMeContainer}>
              <Checkbox
                status={rememberMe ? 'checked' : 'unchecked'}
                onPress={() => setRememberMe(!rememberMe)}
                color={styles.primaryColor.color}
              />
              <Text style={styles.rememberMeText} onPress={() => setRememberMe(!rememberMe)}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            onPress={onLoginPressed}
            loading={loading}
            style={styles.loginButton}
            labelStyle={styles.loginButtonLabel}
          >
            Login
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerImageContainer: {
    width: '100%',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    marginTop: -40, // Negative margin to pull content up over image
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D6A4F', // Natural green
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  input: {
    marginBottom: 1,
    backgroundColor: '#E8F5E9',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8, // Adjust for checkbox padding
  },
  rememberMeText: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  forgotPassword: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  loginButton: {
    borderRadius: 25, // Fully rounded
    backgroundColor: '#2D6A4F', // Natural green
    marginTop: 0,
    width: '100%',
    paddingVertical: 2,
  },
  loginButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: '#2D6A4F', // Natural green
  },
  primaryColor: {
    color: '#2D6A4F',
  }
});

export default LoginScreen;

