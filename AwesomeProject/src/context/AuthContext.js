import React, { createContext, useState} from 'react';
import { Button } from 'react-native';
import { getAccessToken } from 'react-native-axios-jwt';
import * as Keychain from 'react-native-keychain';

const AuthContext= createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) =>{

    const [authState, setAuthState] = useState({
        accessToken:null,
        refreshToken:null,
        authenticated:null,
    });

    const getAccessToken = () => {
        return authState.accessToken.token; 
    };

    return (
      <Provider value={{
        authState,
        setAuthState,    
        getAccessToken
        }}>
        {children}
      </Provider>
    )};

export {AuthContext, AuthProvider};