//servir todos los reducers
import { combineReducers } from "redux";
import {authLoginReducer,authRegisterReducer,authDetailsReducer} from './authReducer';   //cambiar por el mio
import {chatReducer} from './chatReducer'; 

export default combineReducers({
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer,
    authDetails: authDetailsReducer,
    chat: chatReducer
});