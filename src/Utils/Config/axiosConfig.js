// import axios from 'axios';
// import {  REACT_APP_API_URL, ProjectUrl, REACT_APP_ACCOUNT_API_URL, REACT_APP_DRIVE_URL } from "./envConfig"
// import jwt_decode from "jwt-decode";
// export const decode = localStorage.getItem('accessToken') ?  jwt_decode((localStorage.getItem('accessToken')) ) : null;


// export const _api = axios.create(
//   {
//     baseURL: REACT_APP_API_URL,
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//     },
//   }
// )


// _api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     //   const statusCode = _get(error, 'response.status', '');
//     console.log("interceptor error", error)

//     if (error.response) {
//       // Handle API response error here
//       const statusCode = error.response.status;
//       if (statusCode === 401) {
//         // localStorage.clear();
//         const path = window.location.pathname.split('/').length > 1 ? window.location.pathname.split('/')[1] : 'dashboard';
//         // window.location.href = `${ProjectUrl[0].url}?continue=active_reports+${""}`;
//       }
//       return Promise.reject(error.response);
//     } else {
//       // Handle network error here
      
//       return Promise.reject(error);
//     }
   


//   }
// );

// export const _driveApi = axios.create(
//   {
//     baseURL: REACT_APP_DRIVE_URL,
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('accessToken') }`,
//     },
//   }
// )

// export const _getAccountAPI = (_accountToken)=>{
  
//   return axios.create(
//   {
//     baseURL: REACT_APP_ACCOUNT_API_URL,
//     headers: {
//       'Authorization': `Bearer ${_accountToken || localStorage.getItem('accountAccessToken')}`,
//     },
//   }
// )
// }