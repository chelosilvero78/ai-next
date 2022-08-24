/* eslint-disable */
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ACCESS_TOKEN } from "../utils/constants";
import { useDispatch/*, useSelector*/ } from 'react-redux';
import { startSocket, closeSocket, onlineSocket } from "../redux/actions/chatActions";

export const useSocket = (serverPath) => {
    const dispatch = useDispatch();  //nos va a permitir llamar acciones de redux  :)
    // const auth = useSelector((state) => state.authLogin)

    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    const conectarSocket = useCallback(() => {
        // const token = localStorage.getItem('token');
        const token = localStorage.getItem(ACCESS_TOKEN);

        const socketTemp = io.connect(serverPath, {
            // transports: ['websocket'],
            transports: ['polling'],
            autoConnect: true,
            forceNew: true,
            query: {
                //'x-token': token
                'Authorization': token
            }
        });
        setSocket(socketTemp);
        dispatch(startSocket())
    }, [serverPath]);

    const desconectarSocket = useCallback(() => {
        socket?.disconnect()
            && dispatch(closeSocket());
    }, [socket]);


    useEffect(() => {
        const online = socket?.connected ? socket.connected : false;
        setOnline(online);
        dispatch(onlineSocket(online))
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true)
            dispatch(onlineSocket(true))
        })
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => {
            setOnline(false)
            dispatch(onlineSocket(false))
        });
    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}