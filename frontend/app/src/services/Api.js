import axios from 'axios'


export const baseUrl = axios.create({
  baseURL: "https://api.e-commerceodai.shop/",
  withCredentials:true, 
});

// export const baseUrl = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials:true, 
// });

