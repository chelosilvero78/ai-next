import Document, { Html, Head, Main, NextScript } from 'next/document';
import {ServerStyleSheets} from '@mui/styles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initalProps = await Document.getInitialProps(ctx)

    return initalProps
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="shortcut icon" href="/img/favicon.png" type="image/png"  />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

//---------------------------------------------------------------------------
//https://github.com/czetsuya/nextjs-redux-observable
//---------------------------------------------------------------------------
//-----modelo de uso _document------

// `getInitialProps` belongs to `_document` (instead of `_app`),
// `getInitialProps` pertenece a `_document` (en lugar de `_app`),
// it's compatible with server-side generation (SSG).
// es compatible con la generación del lado del servidor (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  // Renderice la aplicación y la página y obtenga el contexto de la página con los efectos secundarios recopilados.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    // El fragmento de estilos se representa después de que finaliza la representación de la aplicación y la página
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};