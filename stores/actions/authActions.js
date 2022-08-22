//==========MODELO MASR===========================================
import { /*Form, Icon, Input, Button, */ notification } from "antd";
//----------de--> authContext --> 
//import jwtDecode from "jwt-decode";
import { fetchSinToken, fetchConToken } from '../../helpers/fetch';
import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_CHECK_TOKEN_RENEW, AUTH_LOGOUT,AUTH_LOGIN_FAIL,AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,AUTH_REGISTER_FAIL,
  AUTH_DETAILS_REQUEST,
  AUTH_DETAILS_SUCCESS,
  AUTH_DETAILS_FAIL } from '../types/authConstants'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { validateToken } from '../../helpers/checkForToken';
import {startSocket } from './chatActions';

//==== Adaptación masr-brad ====
export const login = (email, password) => async (dispatch) => {  //-----------brad
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST })    //  -->  loading: true
    // const config = { headers: {'Content-Type': 'application/json' }    }  //--> BradTraversy
    // const { data } = await axios.post('/api/users/login',{ email, password }, config ) //-->BradTraversy
    const resp = await fetchSinToken('auth/login', { email, password }, 'POST'); //modelo fernando
    //si viene algun error desde la API controlarlo, capturarlo y mostrar mensaje
    if ( resp.message) {   //  if (resp.status !== 200)  //--> undefined
      const {message} = resp
      throw message; //relanzarlo para ir al bloque catch-->
    }
    const { accessToken, refreshToken } = resp
    // localStorage.setItem('userInfo', JSON.stringify(user));  //cuando es objeto json --> stringify
    localStorage.setItem('accessToken', accessToken);   //texto simple
    localStorage.setItem('refreshToken', refreshToken);  //texto simple
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: resp })
    notification["success"]({ message: "Login correcto...  :)", });
    window.location.href = "/ai";
    dispatch(startSocket())
    // }else {  throw new Error({error:body}) }  //similar al de fernando herrera
  } catch (error) {
    console.log("error capturado-->", error)
    dispatch({
      type: AUTH_LOGIN_FAIL,
      //payload: error.response && error.response.data.message? error.response.data.message: error.data.message,
      // payload: error.message ? error.message : error,
      payload: error,
    })
    // notification["error"](error.message ? error.message : error);
    notification["error"]({message:error});
  }
}

//==== Adaptación masr-brad ====
export const logout = () => (dispatch) => {
  // localStorage.removeItem('cartItems')
  // localStorage.removeItem('shippingAddress')
  // localStorage.removeItem('paymentMethod')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  // localStorage.removeItem('userInfo')
  // localStorage.clear()

  dispatch({ type: AUTH_LOGOUT })
  // dispatch({ type: USER_DETAILS_RESET })
  // dispatch({ type: ORDER_LIST_MY_RESET })
  // dispatch({ type: USER_LIST_RESET })
  document.location.href = '/';
  //window.location.reload();
  notification["success"]({ message: "exit success...", });

  //--------------otros modelos-----------------
  // localStorage.clear();  //fernando herrera
  // const logout = () => ({ type: types.authLogout })  //fernando herrera
  // dispatch(setCurrentUser({user: {}, loggedIn: false  }));  //modelo Jonathan
}

//==== Adaptación masr-brad ====
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REGISTER_REQUEST })   //  -->  loading: true
    // const config = { headers:{'Content-Type':'application/json'}  }
    // const { data } = await axios.post('/api/users', { name, email, password }, config )
    const data = await fetchSinToken('/auth/sign-up-admin', { userData }, 'POST');  //FERNANDO HERRERA

    //si viene algun error desde la API controlarlo, capturarlo y mostrar mensaje
    const { message } = data
    if (data.status !== 200) {
      throw message; //relanzarlo para ir al bloque catch-->
    }
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data })
    notification["success"](message);   //--> { message: "Usuario creado correctamente." } 
    //------Solo para uso futuro, por si despues del registro deseas loguerte directamente :) 
    //------En este sistema estara inactivo xq se debe activar el User primero.-
    //              dispatch({type: AUTH_LOGIN_SUCCESS, payload: data })
    //              localStorage.setItem('userInfo', JSON.stringify(data))
    //              window.location.href = "/ai";
  } catch (error) {
    // dispatch({ type: AUTH_REGISTER_FAIL, payload: error.message ? error.message : error })
    dispatch({ type: AUTH_REGISTER_FAIL, payload: error })
    notification["error"]({message:error});
  }
}

//==== Adaptación masr-brad ====
export const getAuthDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_DETAILS_REQUEST })   //  -->  loading: true
    // const authState=store.getState().auth ;  //obtener el estado, metodo Jonathan
    // const { userInfo } = authState; //obtener el estado, metodo Jonathan
    const { authLogin: { userInfo } } = getState()  //obtener el estado, metodo brad traversy

    let userLogin = null;
    if (userInfo) {
      userLogin = userInfo;
    } else {
      // const config = { headers: {Authorization: `Bearer ${userInfo.token}` } }
      // const { data } = await axios.get(`/api/users/${id}`, config)
      const data = await fetchSinToken('/auth/current-user', {}, 'POST');  //FERNANDO HERRERA
      //si viene algun error desde la API controlarlo, capturarlo y mostrar mensaje
      if (data.status !== 200) {
        const {message}=data;
        throw message; //relanzarlo para ir al bloque catch-->
      }
      if (data.ok) {
        userLogin = data.user;
      }
    }
    //---> res.json({ok:true,user});
    dispatch({ type: AUTH_DETAILS_SUCCESS, payload: userLogin })
  } catch (error) {
    //const message = error.message ? error.message : error;
    if (error === 'Invalid or expired token') {
      dispatch(logout())
    }
    dispatch({ type: AUTH_DETAILS_FAIL, payload: error })
  }
}


//==================CHECKAR EL TOKEN================= REFRESH
//==== Adaptación masr-fernando  //--> inicialmente --> const startChecking = ()=>{...}
export const checkTokenRenew = () => async (dispatch, getState) => {
  //****************How to get State() ********************************************//
  // const { userInfo }=store.getState().auth  //modelo Johathan desde --> store directamente
  // const { auth: { userInfo },} = store.getState()   //modelo Brad Traversy
  //****************How to get State() ********************************************//

  // if (!localStorage.accessToken && !localStorage.refreshToken) {
  //   // window.location.href = "/login";
  //   dispatch(logout());
  //   return false;
  // }


  const aToken = localStorage.getItem(ACCESS_TOKEN)
  const rToken = localStorage.getItem(REFRESH_TOKEN)

  //  1-verificar reversivamente refreshToken y luego access para simplificar********  :)
  if (validateToken(aToken).cod === 1 && validateToken(rToken).valid) {
    //RESETEAR LOS TOKENs
    const endpoint = `/auth/refresh-access-token`;
    const bodyObj = { refreshToken: rToken };
    const resp = await fetchSinToken(endpoint, bodyObj, 'POST');
    if (!resp.ok) {
      // window.location.href = "/login";
      //      dispatch({type: AUTH_LOGOUT, payload: {} })   //modelo fernando herrera
      dispatch(logout());
      return false
    }
    const { ok, ...authInfo } = resp;
    const { accessToken, /*user*/ } = authInfo;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    // localStorage.setItem(REFRESH_TOKEN, refreshToken;  //no poner porque nunca expirara
    localStorage.setItem(REFRESH_TOKEN, rToken);    //resperar el refresh token para que expire
    // localStorage.setItem('userInfo', user);
    //AL FINAL AJUSTAR ESTE ESTADO
    //     dispatch( checkingFinish() ); //del modelo de fernando herrera
    dispatch({ type: AUTH_CHECK_TOKEN_RENEW, payload: authInfo })
    return true;
  }

  //  2-verificar accessToken, siempre que el refres sea valido ********  :)
  if (validateToken(aToken).valid && validateToken(rToken).valid) {
    let userLogin=null;
    //const { id } = getState().calendar.activeEvent;  //modelo de Fernando
    const { userInfo } = getState().authLogin;   // alternativa para hacer en una sola linea
    if (userInfo) {  //tomamos los datos del estado global
      userLogin = userInfo
    } else {
      const endpoint = `auth/current-user`;                                //delocontrario tomamos de la API
      const resp = await fetchConToken(endpoint, {}, 'POST');
      if (resp.ok) {
        userLogin = resp.user
      }
      // else {error = getAuthDataFromApi.message ? { message: getAuthDataFromApi.message } : { message: 'ocurrió un error, intente mas tarde' };  }
    }
    //ANALIZAR DESDE AQUI--------------------------------------
    if (userLogin) {
      dispatch({ type: AUTH_CHECK_TOKEN_RENEW, payload:{user:userLogin, accessToken:aToken, refreshToken:rToken} });
      return true;
    } else {
      window.location.href = "/login";
      // store.dispatch({ type: AUTH_LOGIN_FAIL, payload: error.message ? error.message : error })
      dispatch(logout());
      return false;
    }
  }
  return false;
}