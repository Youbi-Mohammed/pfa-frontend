import axios from "axios"



export   const getSecureData = async (token: string) => {
  return axios.get("http://localhost:8080/api/test/tokentest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // api.js
}

// const api = axios.create({
//   baseURL: 'http://localhost:8080/api',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Intercepteur pour injecter le token
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
// src/api/axiosInstance.ts
// src/api/axiosInstance.ts
// import  { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Intercepteur de requête corrigé
// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Intercepteur de réponse
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// api/axiosInstance.ts
// api/axiosInstance.ts
import { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Intercepteur de réponse avec typage correct
axiosInstance.interceptors.response.use(
  (response) => {
    // Vous pouvez maintenant accéder à response.apiData en toute sécurité
    if (response.data) {
      return {
        ...response,
        apiData: {
          data: response.data,
          message: response.statusText,
          status: response.status
        }
      };
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const apiError = {
        statusCode: error.response.status,
        message: error.message,
        error: error.code
      };
      
      // Ajoutez les données d'erreur personnalisées
      return Promise.reject({
        ...error,
        apiError
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;