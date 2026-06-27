import axios from 'axios'


export const baseUrl = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials:true, 
});


// export const baseUrl = axios.create({
//   baseURL: "https://api.e-commerceodai.shop/",
//   withCredentials:true, 
// });