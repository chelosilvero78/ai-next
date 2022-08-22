import React, { useState, useEffect, createContext, useCallback } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,      //verifica el token-localstorage  y valida si ha expirado
  getRefreshTokenApi,     //validar el refresh-token-localstorage y si ha expirado
  refreshAccessTokenApi,  //obtener el  accessToken y refreshToken del backend
  logout as logoutApi
} from "../api/auth";
import { ACCESS_TOKEN } from "../utils/constants";
import { fetchConToken/*, fetchSinToken*/ } from '../helpers/fetch';  //temporalmente deshabilitado

export const AuthContext = createContext();

//Adaptación para providers del ChatIo - State---inicio----------
// const initialStateUser = {
//   user: null,
//   loading: true,
// };
const initialStateAuth = {
  user: null,
  loading: true,
  uid: null,
  logged: false,
  name: null,
  email: null,
};
//Adaptación para providers del ChatIo - State---fin-------------

//aqui empieza el (AuthContext)AuthContext
export const AuthProvider  = ({ children }) => {

  // const [user, setUser] = useState({user: null, loading: true });   //estado original
  const [auth, setAuth] = useState(initialStateAuth) //estado para ChatIo

  useEffect(() => {
    // checkUserLogin(setUser); //validar access y refresh token y si no ha expirado.  @param pasado--> la referencia a la función setUser
    checkUserLogin(setAuth); //modificado--> se ha añadido setAuth
  }, []);

  //funcion usada para chatApp
  const verificaToken = useCallback(async () => {

    // const token = localStorage.getItem('token');
    const token = localStorage.getItem(ACCESS_TOKEN);
    // Si token no existe
    if (!token) {
      setAuth(initialStateAuth)
      return false;
    }

    const resp = await fetchConToken('auth/renew');
    if (resp.ok) {
      localStorage.setItem(ACCESS_TOKEN, resp.accessToken);
      // const { usuario } = resp;
      console.log("respuesta-->", resp)
      const { user: usuario } = resp;
      setAuth({
        ...auth,
        uid: usuario.id,
        logged: true,
        name: usuario.name_user,
        email: usuario.email_user,
      });
      return true;
    } else {
      setAuth(...initialStateAuth);
      return false;
    }

  }, [])

  const logout = () => {
    logoutApi();
    setAuth({ user: null, loading: false,uid:null, logged: false,name:null, email:null });
  }
  //---------adapatacion ChatIo-----------------fin---


  return (
    <AuthContext.Provider
      value={{ auth, verificaToken, logout,checkUserLogin,setAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//comprobar access y refresh token, y si ha expirado @param pasado--> la referencia a la función setAuth
const checkUserLogin = async (setAuth) => {
  const accessToken = getAccessTokenApi();  //obtiene el accessToken desde el localstorage, validando si ha expirado
  //masr-si no existe el access-token, obtener el refresh-token
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi(); //obtener el refreshToken desde el local storage
    //si aun no existe el refresh-token, salir.-
    if (!refreshToken) {
      logoutApi();
      setAuth({ ...initialStateAuth, loading: false,user:null });
    } else {
      refreshAccessTokenApi(refreshToken);  //obtener {accessToken, refreshToken, user,ok} del backend, y registrar en el local Storage
    }
  } else {
    //masr-existe el accessToken entonces reasignar state
    // setUser({loading: false, user: jwtDecode(accessToken) });  //-->inicialmente
    const user = jwtDecode(accessToken)
    setAuth({
      user,
      loading: false,
      uid: user.id,
      logged: true,
      name: user.name_user,
      email: user.email_user
    });
  }
};