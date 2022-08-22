// import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/main.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  // const getLayout = Component.getLayout || ((page) => page );
  // return getLayout( <Component {...pageProps} /> )

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>AI | System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <meta name="author" content="" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
