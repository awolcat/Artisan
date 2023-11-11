import { useState } from 'react';

export default function useToken() {
/*
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    
    return tokenString
  }
*/

  const [token, setToken] = useState(null);
  const [identity, setIdentity] = useState(null);

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  }

  function saveIdentity(userObj) {
    setIdentity(userObj);
  }

  return {
    setToken: saveToken,
    token,
    setIdentity: saveIdentity,
    identity,
}
}