import React, { useEffect } from 'react';
import { createContext } from 'react';

import { useSocket } from '../hooks/useSocket'

// import { scrollToBottomAnimated } from '../helpers/chat-app/scrollToBottom';
// import store from "../../stores/store";
import { useDispatch, useSelector } from 'react-redux';
import { usersLoadeds /*, newMessages, startSocket*/ } from "../redux/actions/chatActions";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_SOCKET_SERVER);
    // const { auth } = useContext(AuthChatContext);
    const dispatch = useDispatch();  //nos va a permitir llamar acciones de redux  :)
    const auth = useSelector((state) => state.authLogin)

    const urlSocketServer = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:5000';
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(`${urlSocketServer}`);
    // const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        // if (auth?.loggedIn) {
        if (auth.loggedIn) {
            //dispatch(startSocket())
            conectarSocket();
        }
    // }, [auth, dispatch, conectarSocket]);
    }, [auth, conectarSocket]);

    useEffect(() => {
        // if (!auth?.loggedIn) {
        if (!auth.loggedIn) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        // socket?.on('lista-usuarios', (usuarios) => {
        //     dispatch(usersLoadeds(usuarios));
        // })
        if (socket) {
            socket.on('lista-usuarios', (usuarios) => {
                dispatch(usersLoadeds(usuarios));
            })
        }
    }, [socket, dispatch]);

    // //dispatch new messages
    // useEffect(() => {
    //     // socket?.on('mensaje-personal', (mensaje) => {
    //     //     dispatch(newMessages(mensaje));
    //     //     scrollToBottomAnimated('mensajes');
    //     // })
    //     if (socket) {
    //         socket.on('mensaje-personal', (mensaje) => {
    //             dispatch(newMessages(mensaje));
    //             scrollToBottomAnimated('mensajes');
    //         })
    //     }
    // }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}


// //stackoverflow------------------------------
// useEffect(() => {
//     if (socket) {
//         socket.on('connect', () => {
//             console.log('connected');
//             getLocation();
//         });
//     }
//     return () => {
//         // Anything in here is fired on component unmount.
//         if (socket) {
//             socket.disconnect();
//         }
//     }
// }, [socket])
// //stackoverflow------------------------------