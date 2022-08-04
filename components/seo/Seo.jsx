import Head from 'next/head'

const SEO = () => {

    return (
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
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css" />
            <link rel="stylesheet" href="/dist/css/adminlte.min.css" />

            <script async src="/plugins/jquery/jquery.min.js" />
            <script async src="/plugins/bootstrap/js/bootstrap.bundle.min.js" />
            <script async src="/dist/js/adminlte.js"/>
            <script async src="/plugins/chart.js/Chart.min.js"/>
            <script async src="/dist/js/demo.js"/>
            <script async src="/dist/js/pages/dashboard3.js"/>
        </Head>
    )
}

export default SEO