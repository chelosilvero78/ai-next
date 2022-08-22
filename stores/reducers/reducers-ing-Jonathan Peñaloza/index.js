//tercer archivo creado para combinar todos los reducer y se expone como indice principal
//usando una funcion denominada cobineReducers
import { combineReducers } from "redux";
import authReducer from './authReducer';
import userPostReducer from "./userPostReducer";

export default combineReducers({
    auth: authReducer,
    posts: userPostReducer
});