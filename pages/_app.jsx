import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../stores/store';
import { SocketProvider } from '../context/SocketContext';

// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

import '../styles/global.scss';


export default function MyApp({ Component, pageProps }) {

  // const getLayout = Component.getLayout || ((page) => page);

  // return getLayout( <Component {...pageProps} /> )

  console.log("Rendering App...");

  const store = useStore(pageProps.initialReduxState);
  const dispatch = store.dispatch;
  const getState = store.getState;

  useEffect(() => {
    console.log("store has changed");
  }, [store]);

  useEffect(() => {
    console.log("dispatch has changed");
  }, [dispatch]);

  useEffect(() => {
    console.log("getState has changed");
  }, [getState]);
  return (
    <>
      <Head>
        <title>AI | System</title>
      </Head>
      <Provider store={store}>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </Provider>
    </>
  )
}