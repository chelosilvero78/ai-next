import Head from 'next/head';
import { Row, Col } from "antd";
import MenuwebTop from "../../components/Web/MenuwebTop";
import Footer from "../../components/Web/Footer";

export const PublicLayout = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head> 
        <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuwebTop />
        </Col>
        <Col lg={4} />
      </Row>
      {children}
      <Footer />
    </>
  )
}


