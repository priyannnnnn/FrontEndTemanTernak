// import { applyAuthTokenInterceptor,IAuthTokens, TokenRefreshRequest } from 'react-native-axios-jwt';
// import axios from 'axios';

// const BAse_URL= 'http://139.162.6.202:8000';

// export const axiosInstance=axios.create({baseURL:BAse_URL})

// const requestRefresh:TokenRefreshRequest=async(refreshToken:string): Promise<string>=>{
//     const response=await axios.post(`${BAse_URL}/api/v1/login/email`,{refresh})
//     return response.data.access_token
// }



// (refresh)=>{
//     const response=await axios.post(`${BAse_URL}/api/v1/login/email`,{refresh})

//     return response.data.access_token
// };

// applyAuthTokenInterceptor(axiosInstance, {requestRefresh});
