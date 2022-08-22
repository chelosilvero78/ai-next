import React from "react";
import { Row, Col } from "antd";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16} xs={24} sm={16}>
          <h2>
            La Nueva Generación de <br /> Sistemas de Auditoria Interna.
          </h2>
          <h3 className="main-banner__main-text">
            Aprende con los nuevos métodos de control que usan las últimas
            tecnologías web y móvil,
            <br /> A través de este intuitivo y practico sistema desarrollado
            con ReactJS en el Frontend, es decir en el lado del cliente
            <br /> y en el lado del Backend(servidor) fue desarrollado con
            NodeJs
          </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
}
