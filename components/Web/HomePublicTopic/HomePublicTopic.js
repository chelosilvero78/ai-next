import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, Card, Button } from "antd";
import imgAuditoriaInterna from "../../../assets/img/jpg/auditoria-interna.jpg";
import imgControlInterno from "../../../assets/img/jpg/control-interno.jpg";
import imgAutoevaluacion from "../../../assets/img/jpg/autoevaluacion-audit.jpg";
import imgRiesgoAdministracion from "../../../assets/img/jpg/riesgo-administracion.jpg";
import imgObjetivosEmpresariales from "../../../assets/img/jpg/brujula-audit.jpg";
import imgPlanificacion from "../../../assets/img/jpg/Internal-audit-schedule.jpg";
import imgBlog from "../../../assets/img/jpg/business-blog.jpg";


export default function HomePublicTopic() {
  return (
    <Row className="home-public-topic">
      <Col lg={24} className="home-public-topic__title">
        <h2>Aprende y mejora tus habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardTopic
              image={imgBlog}
              title="Blog Publico Corporativo"
              subtitle="Publicaciones Corporativas Periódicas "
              link="/blog"
            />
          </Col>
          <Col md={6}>
            <CardTopic
              image={imgAuditoriaInterna}
              title="AI | Systems"
              subtitle="Sistema de Auditoria Interna"
              link="/ai"
            />
          </Col>
          <Col md={6}>
            <CardTopic
              image={imgControlInterno}
              title="Control Internol"
              subtitle="Informaciones sobre control Interno"
              link="/ai/informaciones-control-interno"
            />
          </Col>
          <Col md={6}>
            <CardTopic
              image={imgRiesgoAdministracion}
              title="Administración del Riesgo"
              subtitle="Administra rápidamente los riesgos de Control Interno"
              link="/ai/riesgo-dashboard"
            />
          </Col>
        </Row>
        <Row className="row-courses">
          <Col md={6}>
            <CardTopic
              image={imgObjetivosEmpresariales}
              title="Objetivos Empresariales"
              subtitle="Objetivos Empresariales Publicos"
              link="/ai/objetivos-empresariales"
            />
          </Col>
          <Col md={6}>
            <CardTopic
              image={imgPlanificacion}
              title="Planificación"
              subtitle="Planificación de Actividades en la Agenda"
              link="/ai/planificacion"
            />
          </Col>
          <Col md={6} />
          <Col md={6}>
            <CardTopic
              image={imgAutoevaluacion}
              title="Autoevaluación"
              subtitle="reflexionemos sobre nuestras acciones, a fin de mejorar"
              link="/ai/autoevaluacion"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-public-topic__more">
        <Link href="/courses">
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardTopic(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  let result = title === "AI | Systems" ? true : false;
  return (
    <>
      {(result && (
        <Link href="/ai">
          <Card
            className="home-public-topic__card"
            cover={<Image src={image} alt={title} />}
            actions={[<Button key='ingresar'>INGRESAR</Button>]}
          >
            <Meta title={title} description={subtitle} />
          </Card>
        </Link>
      )) || (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
              className="home-public-topic__card"
              cover={<Image src={image} alt={title} />}
              actions={[<Button key="ingresar2">INGRESAR</Button>]}
            >
              <Meta title={title} description={subtitle} />
            </Card>
          </a>
        )}
    </>
  );
}