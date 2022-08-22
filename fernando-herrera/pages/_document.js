import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

  render() {
      return (
        <html>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>AI_20171219_1128 | MENU</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="" />
                <link rel="shortcut icon" type="/image/png" href="/img/favicon.png" />
                {/* <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" /> */}

                <link href="/components/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
            </Head>
            <body className="sidebar-mini">
                <Main />
                <NextScript />
                <script src="/components/jquery/jquery3.4.1/jquery-3.4.1.js" async></script>
                <script src="/components/bootstrap/js/bootstrap.min.js" async></script>
                <script src="/components/bootstrap-datepicker/js/bootstrap-datepicker.js" async></script>
                <script src="/components/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js" async></script>
                <script src="/plugins/moment/moment-with-locales.min.js" async></script>
                <script src="/plugins/datetimepicker/js/bootstrap-datetimepicker.min.js" async></script>
                <script src="/components/excel/js/xlsx.full.min.js" async></script>
                <script src="/components/fileinput/js/fileinput.min.js" async></script>
                <script src="/components/fileinput/themes/explorer/theme.min.js" async></script>
                <script src="/components/fileinput/js/locales/es.js" async></script>
                <script src="/components/moment/min/moment.min.js" async></script>        
                <script src="/components/moment/min/locales.js" async></script>
                <script src="/components/footables-boostrap/footable-3.1.5/js/footable.min.js" async></script>
                <script src="/components/select-bootstrap/select-bootstrap1.12.4/js/bootstrap-select.min.js" async></script>
                <script src="/components/inputmask/inputmask@4.0.0/dist/jquery.inputmask.bundle.min.js" async></script>
                <script src="/components/inputmask/inputmask@4.0.0/dist/min/inputmask/phone-codes/phone.min.js" async></script>
                <script src="/components/exif-js/exif.js" async></script>
                <script src="/components/sweetalert2@9/sweetalert2@9.js" async></script>
                <script src="/components/sweetalert2@9/sweetalert2@9.js" async></script>
                <script src="/js/funciones.js" type="text/javascript" async></script>        
            </body>
        </html>
    );
  }
}
