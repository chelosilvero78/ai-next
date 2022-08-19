// import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css'   // import '../styles/main.css';

export default function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page );

  // return (
  //   <>
  //     <Component {...pageProps} />
  //   </>
  // )
  return getLayout( <Component {...pageProps} /> )
}

//-------------------------------------------------------
// export default function MyApp({ Component, pageProps }) {
//   // Use the layout defined at the page level, if available (Usar el diseño definido en el nivel de página, si está disponible)
//   const getLayout = Component.getLayout || ((page) => page)

//   return getLayout(<Component {...pageProps} />)
// }
//-------------------------------------------------------

// import SEO from '../components/seo/Seo'
// import LayoutAi from '../components/layouts'

// function MyApp({ Component, pageProps }) {

//    return (
//     <LayoutAi>
//       <SEO />
//       <Component {...pageProps} />
//     </LayoutAi>
//   )
// }

// export default MyApp
