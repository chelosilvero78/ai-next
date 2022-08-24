//Es lo sexto creado en redux
import axios from "axios";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../helpers/endpoints";
import { SET_CURRENT_USER } from "./types";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';  //crear funcion para añadir token a axios

//aqui recibiremos los datos del formulario y ejecutaremos el dispatch
export const loginUser = (userData) => dispatch => {

    //console.log(userData);

    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, userData, {
            headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
        }).then(response => {

            //console.log(response);
            //aqui guardamos el token y lo capturamos en la variable 
            //authorization(que es nuestro Bearer Token, que sera guardado
            //en el localStorage

            const { authorization } = response.headers;

            localStorage.setItem('jwtToken', authorization);

            //crear funcion para añadir token a axios
            setAuthToken(authorization);

            const decoded = jwt_decode(authorization);

            dispatch(setCurrentUser({ user: decoded, loggedIn: true }));

            resolve(response);
        }).catch(error => {
            reject(error);
        })
    });
}


export const registerUser = (userData) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(REGISTER_ENDPOINT, userData, {
            headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const setCurrentUser = ({ user, loggedIn }) => {
    return {
        type: SET_CURRENT_USER,
        payload: { user, loggedIn }
    };
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    dispatch(setCurrentUser({
        user: {},
        loggedIn: false
    }));
}