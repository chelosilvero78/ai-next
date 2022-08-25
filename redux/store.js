//-------->   yarn add react-redux redux redux-thunk
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";  //para controlar cambios de redux en el explorador, yarn add redux-devtools-extension [--save-dev || -D ]
import { createWrapper } from "next-redux-wrapper";  //agregado por masr 20220824_1312s
import rootReducer from './reducers';  //agrupamiento de todos los redux
//import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";  //const string-> 'accessToken' y 'refreshToken'

// const isProductionMode =process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';


// CAMBIO PARA NEXTJS, CONTROLAR SI LA EJECUCION ES DEL LADO DEL CLIENTE O SERVER? 

// const ISSERVER = typeof window === "undefined";  //SERVER
// const isClient = typeof window !== 'undefined';  //CLIENT

// if(!ISSERVER) {
//     // Access localStorage
//     ...localStorage.get...
// }

const isClient = typeof window !== 'undefined';

let accessTokenFromStorage = null;
let refreshTokenFromStorage = null;

// 1- initial states here if it server side
const initialState = {
    authLogin: {
        accessToken: accessTokenFromStorage,
        refreshToken: refreshTokenFromStorage,
        loading: false,
        loggedIn: false,
        userInfo: null,
        uid: null,
        name: null,
        email: null
    },
    chat: {
        uid: '',
        chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
        usuarios: [], // Todos los usuarios de la base datos
        mensajes: [], // El chat seleccionado   
    },
}



if (isClient) {

    //get local storage if it client side
    accessTokenFromStorage = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
    
    refreshTokenFromStorage = localStorage.getItem('refreshToken')
    ? localStorage.getItem('refreshToken')
    : null
    
    // 1- initial states here if it client side
    initialState.authLogin.accessToken=accessTokenFromStorage;
    initialState.authLogin.refreshToken=refreshTokenFromStorage;
}



// 2- middleware
const middleware = [thunk];

//crear el store******************************
// 3- creating store
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// 4- assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);