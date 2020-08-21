import request from './index'
const login = (params) => {
  return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
};
export {
  login
};
// fetch('', {
  
// })