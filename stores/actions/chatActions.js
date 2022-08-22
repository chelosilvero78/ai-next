// import { /*Form, Icon, Input, Button, */ notification } from "antd";
//import { fetchSinToken, fetchConToken } from '../../helpers/fetch';
import { CHAT_USER_LOADEDS, CHAT_ACTIVATE, CHAT_MESSAGES_NEW, CHAT_MESSAGES_LOAD, CHAT_SOCKET_START, CHAT_SOCKET_CLOSE, CHAT_SOCKET_ONLINE } from '../types/chatConstants'

//Inicio|conectar socket
export const startSocket = () => async (dispatch, getState) => {
  const auth = getState().authLogin;   // alternativa para hacer en una sola linea
  dispatch({
    type: CHAT_SOCKET_START,
    payload: { uid: auth.uid, nickname: auth.name, online: true}
  })
}
//desconectar socket
export const closeSocket = () => async (dispatch) => {
  dispatch({type: CHAT_SOCKET_CLOSE })
}
//socket online state
export const onlineSocket = (online) => async (dispatch) => {
  dispatch({
    type: CHAT_SOCKET_ONLINE,
    payload:{online:online}
   })
}
//Usuarios Cargados
export const usersLoadeds = (users) => async (dispatch) => {
  dispatch({
    type: CHAT_USER_LOADEDS,
    payload: users
  })
}

//Activar Chat
export const activateChat = (id) => async (dispatch) => {
  dispatch({
    type: CHAT_ACTIVATE,
    payload: id
  })
}

//Mensajes nuevos
export const newMessages = (messages) => async (dispatch) => {
  dispatch({
    type: CHAT_MESSAGES_NEW,
    payload: messages
  })
}

//Cargar Mensajes
export const loadMessages = (messages) => async (dispatch) => {
  dispatch({
    type: CHAT_MESSAGES_LOAD,
    payload: messages
  })
}

