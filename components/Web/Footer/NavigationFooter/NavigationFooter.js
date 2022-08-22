import { Row, Col } from "antd";
import Link from 'next/link'
import { BookOutlined, CodeOutlined,DatabaseOutlined, RightOutlined, HddOutlined,AppstoreOutlined,UserOutlined } from "@ant-design/icons";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <Link href="/blog">
          <BookOutlined /> Publicación Institucional
        </Link>
      </li>
      <li>
        <a href="#">
          <CodeOutlined /> Informes
        </a>
      </li>
      <li>
        <a href="#">
          <DatabaseOutlined />Archivo
        </a>
      </li>
      <li>
        <a href="#">
          <RightOutlined /> Politica de Privacidad
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <HddOutlined /> Documetación
        </a>
      </li>
      <li>
        <a href="#">
          <AppstoreOutlined /> CMS
        </a>
      </li>
      <li>
        <a href="#">
          <UserOutlined /> Porfolio
        </a>
      </li>
      <li>
        <a href="#">
          <RightOutlined /> Política de Cookies
        </a>
      </li>
    </ul>
  );
}
