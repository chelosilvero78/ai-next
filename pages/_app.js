// import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css'   // import '../styles/main.css';

import SEO from '../components/seo/Seo'
import LayoutAi from '../components/layouts'

function MyApp({ Component, pageProps }) {

   return (
    <LayoutAi>
      <SEO />
      <Component {...pageProps} />
    </LayoutAi>
  )
}

export default MyApp