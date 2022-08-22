import { API_PATH_PREFIX_EXCLUDE_VERSION,API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";  //const string-> 'accessToken' y 'refreshToken'
import jwtDecode from "jwt-decode";

//devover el access-token-localstorage de user logueado
export const getAccessTokenApi=() => {
  // validar el accessToken, y virificar que no ha expirado
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null") {
    return null;
  }
  return willExpireToken(accessToken) ? null : accessToken; //verificar antes si ha expirado
}

//validar el refresh-token-localstorage y si ha expirado
export const getRefreshTokenApi=() => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === "null") {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}

//obtener el  accessToken y refreshToken del backend, luego registrar en el localstorage
export const refreshAccessTokenApi= (refreshToken)=> {
  // const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/refresh-access-token`;
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/auth/refresh-access-token`;
  const bodyObj={refreshToken};
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {"Content-Type": "application/json"}
  };
  fetch(url, params)
    .then(response => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(result => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

//cerrar sesion
export const logout=()=> {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

//valida si el token ha expirado-->  token? [true=expirado | false=noexpirado]
const willExpireToken=(token)=> {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
