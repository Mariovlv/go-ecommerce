import axios, { Axios, AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const ping = (): Promise<AxiosResponse> => {
  return api.get('/ping');
};

export const signupUser = (data: any): Promise<AxiosResponse> => {
    return api.post('/signup', data)
}

export const signinUser = (data: any): Promise<AxiosResponse> => {
    return api.post('/signin', data)
}

// Add more API functions here as needed
// export const someOtherEndpoint = (params) => api.post('/endpoint', params);

export default api;