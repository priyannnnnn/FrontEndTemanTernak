import React, { createContext, useState} from 'react';
import { Button } from 'react-native';
import { getAccessToken } from 'react-native-axios-jwt';
import * as Keychain from 'react-native-keychain';

const AuthContext= createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) =>{

    const [authState, setAuthState] = useState({
        accessToken:null,
        authenticated:null,
    });

    const getAccessToken = () => {
        console.log("getAccessToken",authState.accessToken);
        return authState.accessToken; 
    };

    

    return (
      <Provider value={{
        authState,
        getAccessToken,
        setAuthState,    
        }}>
        {children}
      </Provider>
    )};

export {AuthContext, AuthProvider};