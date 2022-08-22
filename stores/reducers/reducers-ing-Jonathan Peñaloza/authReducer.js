import { SET_CURRENT_USER } from "../actions/types";

//se usa la librería react-redux
//Este el  primer archivo de redux que se inicializa el estado inicial del nuestra aplicacion

const initialState = {loggedIn: false, user: {}};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                user: payload.user
            }
        default:
            return state;
    }
}