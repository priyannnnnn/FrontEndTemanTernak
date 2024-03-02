import React, { useState,useContext, useCallback, useEffect } from 'react'
import axios from "axios";
import { TouchableOpacity, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import * as Keychain from 'react-native-keychain';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../helpers/Spiner';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

const Api =({navigation})=>{
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async() => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success')
    } catch (error){
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  },[])

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading'){
    return<Spinner/>;
  }

  if(authContext?.authState?.authenticated === false){
    return<LoginScreen/>
  } else {
    return <Dashboard/>
  }
};
export default Api;
