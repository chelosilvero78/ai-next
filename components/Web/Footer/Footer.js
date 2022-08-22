import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import Newsletter from "../Newsletter";


export default function Footer() {
  const { Footer } = Layout;

  return (
    <Footer className="footer">
      <Row>
        <Col md={1} />
        <Col md={22}>
          <Row>
            <Col md={12}>
              <NavigationFooter />
            </Col>
            <Col md={12}>
              <Newsletter />
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <MyInfo />
            </Col>
          </Row>
          <Row className="footer__copyright">
            <Col md={12}>© 2021 ALL RIGHTS RESERVED​</Col>
            <Col md={12}>AI | Auditoria Interna</Col>
          </Row>
        </Col>
        <Col md={1} />
      </Row>
    </Footer>
  );
}
