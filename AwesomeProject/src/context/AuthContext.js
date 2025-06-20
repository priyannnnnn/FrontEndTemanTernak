// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    user: null, // default
    authenticated: false,
  });

  // Load token on startup
  useEffect(() => {
    const loadToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const tokens = JSON.parse(credentials.password);
          setAuthState({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: tokens.user,
            authenticated: true,
          });
          console.log("Loaded accessToken:", tokens.accessToken?.token);
        }
      } catch (e) {
        console.log('Error loading token:', e);
      }
    };
    loadToken();
  }, []);

  const getAccessToken = () => {
    return authState?.accessToken?.token || null;
  };

  return (
    <Provider value={{ authState, setAuthState, getAccessToken }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
