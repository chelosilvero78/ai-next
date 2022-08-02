import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    <title> AI_20171219_1128 </title>
                    <meta name="description" content="Web site auditoria interna de la cooperativa sancristobal" />

                    <meta name="theme-color" content="#000000" />
                    <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

                    {/* Google Font: Source Sans Pro */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
                    />
                    {/* Font Awesome Icons */}
                    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />
                    {/* IonIcons */}
                    <link
                        rel="stylesheet"
                        href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
                    />
                    {/* Theme style */}
                    <link rel="stylesheet" href="/dist/css/adminlte.min.css" />
                    <link rel="apple-touch-icon" href="/logo192.png" />
                    {/*
                        manifest.json provides metadata used when your web app is installed on a
                        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
                    */}
                    <link rel="manifest" href="/manifest.json" />
                    {/*
                        Notice the use of %PUBLIC_URL% in the tags above.
                        It will be replaced with the URL of the `public` folder during the build.
                        Only files inside the `public` folder can be referenced from the HTML.

                        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                        work correctly both with client-side routing and a non-root public URL.
                        Learn how to configure a non-root public URL by running `npm run build`.
                    */}

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                {/* jQuery */}
                <script src="/plugins/jquery/jquery.min.js"></script>
                {/* Bootstrap */}
                <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
                {/* AdminLTE */}
                <script src="/dist/js/adminlte.js"></script>

                {/* OPTIONAL SCRIPTS  */}
                <script src="/plugins/chart.js/Chart.min.js"></script>
                {/* AdminLTE for demo purposes */}
                <script src="/dist/js/demo.js"></script>
                {/* AdminLTE dashboard demo (This is only for demo purposes) */}
                <script src="/dist/js/pages/dashboard3.js"></script>
            </Html>
        );
    }
}

export default MyDocument;
