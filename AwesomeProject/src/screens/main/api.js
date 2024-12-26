import React, { useState,useContext, useCallback, useEffect } from 'react'
import * as Keychain from 'react-native-keychain';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../helpers/Spiner';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

const Api =({navigation})=>{
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');
  const [ loading, setLoading ] = useState(true)
  const [dataArray, setDataArray] = useState([]);
  
  const loadJWT = useCallback(async() => {
    try {
      const value = await Keychain.getGenericPassword();
      if( value == false){

        setStatus('error');
        authContext.setAuthState({
          accessToken: null,
          authenticated: false,
        });
        return
      }

      const jwt = JSON.parse(value.password);
      const userId = jwt.accessToken.userr.id;
      const name = jwt.accessToken.userr.fullName;
      setDataArray(userId)
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        // refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success')
    } catch (error){
      setStatus('error');
      console.error(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        // refreshToken: null,
        authenticated: false,
      });
    }
  },[setDataArray])

  useEffect(() => {
    // console.log("Updated dataArray from AuthIdContext:", dataArray);
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
