import { CHAT_USER_LOADEDS, CHAT_ACTIVATE, CHAT_MESSAGES_NEW, CHAT_MESSAGES_LOAD,CHAT_SOCKET_START, CHAT_SOCKET_CLOSE, CHAT_SOCKET_ONLINE } from "../types/chatConstants";

// const initialState = {
//     uid: '',
//     chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
//     usuarios: [], // Todos los usuarios de la base datos
//     mensajes: [], // El chat seleccionado
// }

// export const chatReducer = ( state, action ) => {  --> model ChatApp--> fernando
export const chatReducer = (state = {}, action) => {
    const { type, payload } = action;
    // console.log("action-->", type,"\npayload-->",payload)
    switch (type) {
        case CHAT_SOCKET_START:
            return { ...state, uid:payload.uid,nickname:payload.nickname,online:payload.online }
        case CHAT_SOCKET_CLOSE:
            return {online:false}
        case CHAT_SOCKET_ONLINE:
            return {...state, online:payload.online}
        case CHAT_USER_LOADEDS:
            return { ...state, usuarios: [ ...payload ] }
        case CHAT_ACTIVATE:
            if ( state.chatActivo === payload ) return state;
            return { ...state, chatActivo:payload, mensajes: [] }
        case CHAT_MESSAGES_NEW:
            if (state.chatActivo === payload.de || state.chatActivo === payload.para) {
                return {...state, mensajes: [ ...state.mensajes, payload ]}
            } else { return state;}
        case CHAT_MESSAGES_LOAD:
            return {...state, mensajes: [ ...payload ] }
        default:
            return state
    }
}