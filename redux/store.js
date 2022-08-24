//-------->   yarn add react-redux redux redux-thunk
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";  //para controlar cambios de redux en el explorador, yarn add redux-devtools-extension [--save-dev || -D ]
import { createWrapper } from "next-redux-wrapper";  //agregado por masr 20220824_1312s
import rootReducer from './reducers';  //agrupamiento de todos los redux
//import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";  //const string-> 'accessToken' y 'refreshToken'


// if(typeof window !== "undefined") {
//     if(localStorage.getItem("watchlist")) {
//       return JSON.parse(localStorage.getItem("watchlist"))
//     } else{
//     return []
//     }
//  }




//--------------------localStorage--------------

//if (typeof window !== "undefined"){
    const isClient = typeof window !== 'undefined';

    // const isProductionMode =process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';

    const accessTokenFromStorage =(typeof window !== "undefined")
    ? localStorage.getItem('accessToken')
    : null

    const refreshTokenFromStorage = (typeof window !== "undefined")
    ? localStorage.getItem('refreshToken')
    : null

// const userInfoFromStorage = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : []

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//     ? JSON.parse(localStorage.getItem('shippingAddress'))
//     : {}
//--------------------localStorage--------------




//==========estado global inicial===========================
// 1- initial states here
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
    // cart: {
    //     cartItems: cartItemsFromStorage,
    //     shippingAddress: shippingAddressFromStorage,
    // },
}
//==========estado global inicial===========================

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