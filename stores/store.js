//-------->   yarn add react-redux redux redux-thunk
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";  //para controlar cambios de redux en el explorador, yarn add redux-devtools-extension [--save-dev || -D ]
import thunk from 'redux-thunk';
import rootReducer from './reducers';  //agrupamiento de todos los redux
//import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";  //const string-> 'accessToken' y 'refreshToken'


// if(typeof window !== "undefined") {
//     if(localStorage.getItem("watchlist")) {
//       return JSON.parse(localStorage.getItem("watchlist"))
//     } else{
//     return []
//     }
//  }


const middleware = [thunk];

//--------------------localStorage--------------

//if (typeof window !== "undefined"){

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


//crear el store******************************
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;