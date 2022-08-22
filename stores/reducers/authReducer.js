//RECORDATORIO: considerar incluir como el modelo de brad traversy LOGIN_SUCCESS, LOGIN_FAIL.- SI USO EL DE FERNANDO
import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_CHECK_TOKEN_RENEW, AUTH_LOGIN_FAIL, AUTH_LOGOUT,
        AUTH_REGISTER_REQUEST,AUTH_REGISTER_SUCCESS,AUTH_REGISTER_FAIL,
        AUTH_DETAILS_REQUEST,AUTH_DETAILS_SUCCESS,AUTH_DETAILS_FAIL,AUTH_DETAILS_RESET
        } from "../types/authConstants";

// const initialState = {
//     loading: false,     //verdadero=esta cargando y checkear el renewtoken.
//     loggedIn: false,      //fernando herrera: es para loggedIn (true=loggeado,false:desloggeado)
//     user: null,         //agustin
//     uid: null,          //ferando herrera uid socketio
//     name: null,         //ferando herrera uid socketio
//     email: null,        //ferando herrera uid socketio
// }

//export const authReducer = ( state = initialState, action ) => {  //-->modelo fernando
//export const userLoginReducer = (state = {}, action) => {  //-->modelo Brad traversy
export const authLoginReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_LOGIN_REQUEST:
            return { loading: true }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,  //el state inicial
                //...payload,  //sobrescribe al state y todo lo que viene luego lo sobreescribe
                loading: false,
                loggedIn: true,       //isLoggedIn,
                userInfo: payload.user, //del modelo de brad
                uid: payload.user.uid,
                name: payload.user.name_user,
                email: payload.user.email_user,
                online:payload.user.online,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
            }
        case AUTH_CHECK_TOKEN_RENEW:
            return {
                ...state,
                loading: false,
                loggedIn: true,       //isLoggedIn,
                userInfo: payload.user, //del modelo de brad
                uid: payload.user.uid,
                name: payload.user.name_user,
                email: payload.user.email_user,
                online:payload.user.online,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken
            }
        case AUTH_LOGIN_FAIL:
            return { loading: false, error: payload }
        case AUTH_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const authRegisterReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_REGISTER_REQUEST:
            return { loading: true }
        case AUTH_REGISTER_SUCCESS:
            return { loading: false, userInfo: payload }
        case AUTH_REGISTER_FAIL:
            return { loading: false, error: payload }
        // case AUTH_LOGOUT:
        //     return {}
        default:
            return state
    }
}

// esta funcion es para mostrar de detalles del authUser
export const authDetailsReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;
    switch (type) {
      case AUTH_DETAILS_REQUEST:
        return { ...state, loading: true }
      case AUTH_DETAILS_SUCCESS:
        return { loading: false, user: payload }
      case AUTH_DETAILS_FAIL:
        return { loading: false, error: payload }
      case AUTH_DETAILS_RESET:
        return { userInfo: {} }
      default:
        return state
    }
}

//Fernando Herrera------------------------------------------------------------
//                      authCheckingFinish: '[auth] Finish checking(loading) login state',
//                      authStartLogin: '[auth] Start login',
//                      authLogin: '[auth] Login',
//                      authStartRegister: '[auth] Start Register',
//                      authStartStartTokenRenew: '[auth] Start token renew',
//                      authLogout: '[auth] Logout',
//Fernando Herrera------------------------------------------------------------

// //Ryan Dhungel-australia----------------------------------------------
// export const userReducer = (state = null, action) => {
//     const {type, payload}=action;
//     switch (type) {
//       case "LOGGED_IN_USER":
//         return payload;
//       case "LOGOUT":
//         return payload;
//       default:
//         return state;
//     }
//   };

// //Jhonatan Peñaloza
// export default function authReducer(state = initialState, action) {
//     const { type, payload } = action;    
//     switch(type) {
//         case SET_CURRENT_USER:
//             return {
//                 ...state,
//                 loggedIn: payload.loggedIn,
//                 user: payload.user
//             }
//         default:
//             return state;
//     }
// }

//=============== ++++++++++  ++++++++++++++  +++++++++++++++++   +++++++++++++++++++++++ ============= //