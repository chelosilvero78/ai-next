import { Row, Col, Card } from "antd"; //key message user dollar
import { ClockCircleOutlined, CheckCircleOutlined, KeyOutlined, MessageOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";

export default function HowSystemWork() {
  return (
    <Row className="how-system-work">
      <Col lg={24} className="how-system-work__title">
        <h2>Algunas características a Mencionar</h2>
        <h3>
          A continuación se mencionan algunas característica que posee el sistema
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={ClockCircleOutlined}
              title="SSR por Defecto"
              description="SSR por defecto React Storefront muestra automáticamente la página de destino inicial en el servidor de forma predeterminada. Esto significa tiempos de carga más rápidos para los usuarios y un mejor SEO. No es necesaria ninguna configuración"
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={KeyOutlined}
              title="Seguridad por token"
              description="Protección de Acceso por a rutas protejidas TOKEN, con tiempo de expiración y renovación"
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={MessageOutlined}
              title="Aprendizaje colaboratico"
              description="Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden."
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={UserOutlined}
              title="Mejora tu perfil"
              description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={DollarOutlined}
              title="Velocidad ridícula"
              description="AI te permite optimizar al máximo cada métrica de rendimiento real, el cual es percibido por el usuario con renderizado del lado del servidor, conversión automática de AMP, precarga predictiva, optimización de caché, reutilización de datos del cliente, esqueletos y más."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={CheckCircleOutlined}
              title="Creado para sitios complejos"
              description="React Storefront escala de $ 10M a $ 1B + sitios de ingresos. El marco admite la migración del mundo real de sitios de comercio electrónico complejos a PWA en pasos incrementales"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

const CardInfo= (props)=>{
  const { icon:Icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-system-work__card">
      <Meta avatar={<Icon />} title={title} description={description} />   
    </Card>
  );
}