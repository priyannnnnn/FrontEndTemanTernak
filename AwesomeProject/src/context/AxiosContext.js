// context/AxiosContext.js
import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@env';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({ baseURL: BASE_URL });
  const publicAxios = axios.create({ baseURL: BASE_URL });

  // Request interceptor
  authAxios.interceptors.request.use(
    (config) => {
      const token = authContext.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Refresh token logic (optional: adjust based on your backend)
  const refreshAuthLogic = async (failedRequest) => {
    const stored = await Keychain.getGenericPassword();
    if (!stored) return Promise.reject();

    const { refreshToken } = JSON.parse(stored.password);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login/refresh`, {
        refreshToken: refreshToken.token,
      });

      const newAccessToken = response.data.token;

      // Update headers
      failedRequest.response.config.headers.Authorization = 'Bearer ' + newAccessToken;

      const newTokens = {
        accessToken: { token: newAccessToken },
        refreshToken: { token: refreshToken.token },
      };

      authContext.setAuthState({
        ...authContext.authState,
        ...newTokens,
      });

      await Keychain.setGenericPassword('token', JSON.stringify(newTokens));

      return Promise.resolve();
    } catch (err) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
      return Promise.reject(err);
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

  return <Provider value={{ authAxios, publicAxios }}>{children}</Provider>;
};

export { AxiosContext, AxiosProvider };
