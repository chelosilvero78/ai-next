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

                <title>AI_20171219_1128 | MENU</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="" />
                <link rel="shortcut icon" type="/image/png" href="/img/favicon.png" />
                {/* <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" /> */}

                <link href="/components/bootstrap/css/bootstrap.min.css" rel="styltrap-select.min.css" rel="stylesheet" type="text/css"/>
            </Head>
            <body>
                <Main />
                <NextScript />
                <script src="/components/jquery/jquery3.4.1/jquery-3.4.1.js"></script>
                <script src="/components/bootstrap/js/bootstrap.min.js"></script>
                <script src="/components/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
                <script src="/components/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js"></script>
                <script src="/plugins/moment/moment-with-locales.min.js"></script>
                <script src="/plugins/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
                <script src="/components/excel/js/xlsx.full.min.js"></script>
                <script src="/components/fileinput/js/fileinput.min.js"></script>
                <script src="/components/fileinput/themes/explorer/theme.min.js"></script>
                <script src="/components/fileinput/js/locales/es.js"></script>
                <script src="/components/moment/min/moment.min.js"></script>        
                <script src="/components/moment/min/locales.js"></script>
                <script src="/components/footables-boostrap/footable-3.1.5/js/footable.min.js"></script>
                <script src="/components/select-bootstrap/select-bootstrap1.12.4/js/bootstrap-select.min.js"></script>
                <script src="/components/inputmask/inputmask@4.0.0/dist/jquery.inputmask.bundle.min.js"></script>
                <script src="/components/inputmask/inputmask@4.0.0/dist/min/inputmask/phone-codes/phone.min.js"></script>
                <script src="/components/exif-js/exif.js"></script>
                <script src="/components/sweetalert2@9/sweetalert2@9.js"></script>
                <script src="/components/sweetalert2@9/sweetalert2@9.js"></script>
                <script src="/js/funciones.js" type="text/javascript"></script>        
            </body>
        </Html>
    );
  }
}

export default MyDocument;
