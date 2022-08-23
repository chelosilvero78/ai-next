import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

  render() {
      return (
        <html lang="es">
            <Head>
                <link rel="shortcut icon" type="/image/png" href="/img/favicon.png" />
                {/* <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" /> */}
            </Head>
            <body>
                <Main />
                <NextScript /> 
            </body>
        </html>
    );
  }
}
