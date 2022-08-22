/* eslint-disable */
import { useMemo, useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ACCESS_TOKEN } from "../utils/constants";

export const useSocket = (serverPath) => {
    // const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    // const token = localStorage.getItem('token');
    const token = localStorage.getItem(ACCESS_TOKEN);

    // //////////////////////////////////////////////////////////////
    // useMemo(() => (bar) => foo + bar, [foo]);
    // // Código equivalente con useCallback:
    // useCallback((bar) => foo + bar, [foo]);
    // //////////////////////////////////////////////////////////////

    // const socket = useMemo(
    //     () => io.connect(serverPath, { /*configuraciones*/ })
    //     , [serverPath]
    // );

    const socket = useMemo( 
        () =>{
            io.connect(serverPath, {
                //transports: ['websocket'],
                transports: ['polling'],
                autoConnect: true,
                forceNew: true,
                query: {
                    //'x-token': token
                    'Authorization': token
                }
            })
            , [serverPath]   
        } 
    );


    const conectarSocket = useCallback( () => {
        socket()
    },[]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline(true));
    }, [socket])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline(false));
    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}