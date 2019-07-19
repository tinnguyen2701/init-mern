// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001';

// const callApi = (method, endpoint, data = {}) => {
//   if (method === 'GET') {
//     return axios.get(endpoint).then(response => {
//       if (response == null) return null;
//       return response.data;
//     });
//   }
//   return axios.post(endpoint, data).then(response => {
//     if (response == null) return null;
//     return response.data;
//   });
// };

// export default callApi;

import axios from 'axios';
import uuid from 'uuid/v4';

const defaultTimeout = 30000;

const getAbsoluteUrl = url => {
  let a;
  if (!a) a = document.createElement('a');
  a.href = url;
  return a.href;
};

const callApi = (method, endpoint, data = {}) => {
  const config = {
    method,
    url: endpoint.startsWith('http') ? endpoint : getAbsoluteUrl(endpoint),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      correlationId: uuid(),
      [process.env.REACT_APP_SHOPDOMAIN_HEADER]: window[process.env.REACT_APP_GLOBAL_VAR].shop,
    },
    timeout: data.timeout || defaultTimeout,
  };

  // config.credentials = 'include';
  if (data.headers) config.headers = { ...config.headers, ...data.headers };
  if (data.queryParams) config.params = data.queryParams;
  if (data.body) {
    // config.headers = {
    //   ...config.headers,
    //   RequestVerificationToken: getCookie(document.cookie, 'XSRF-TOKEN')
    // };
    config.data = data.body;
  }

  // if we need to check response status, should do it here
  axios.interceptors.response.use(response => response, error => Promise.reject(error));

  return axios(config).then(response => {
    if (response == null) return null;

    return response.data;
  });
};

export default callApi;
