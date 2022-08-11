import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    <meta name="theme-color" content="#000000" />
                    <title>AI_20171219_1128</title>
                    <meta name="keywords" content="" />
                    <meta name="description" content="Web site auditoria interna de la cooperativa sancristobal" />
                    <meta name="author" content="" />

                    <link rel="shortcut icon" href="/img/favicon.png" type="image/png"  />
                    
                    {/* Google Font: Source Sans Pro */}
                    
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
                    {/* Font Awesome Icons */}
                    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />
                    {/* IonIcons */}
                    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
                    {/* Theme style */}
                    <link rel="stylesheet" href="/dist/css/adminlte.min.css" />

                    <link rel="apple-touch-icon" href="/logo192.png" />
                    {/* manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}

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
                </Head>
                <body className="sidebar-mini">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}