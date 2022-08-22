import React from "react";
import AcademyLogo from "../../../../assets/img/png/logo-white.png";

import "./PresentationTopic.scss";

export default function PrestentationTopic() {
  return (
    <div className="presentation-topics">
      <img src={AcademyLogo} alt="Sistema AI" />
      <p>
        AI es un aplicación web SPA(single page application) que fue desarrollado con las mejores prácticas de desarrollo web profesional, 
        destinadas a satisfacer las necesidades de agilización, sistematización, realizacion y control
        de las actividades de Auditoría Interna de la Empresa, en las cuales se busca la practicidad, funcionalidad, con un
        diseño adecuado a brindar la maxima comodidad con una buena experiencia de usuario, con altos estándares de seguridad,
        gestion de administración por roles, habilitación y control de usuarios, gestion de tareas, entre otras muchas funciones
      </p>
      <p>¡¡¡Échales un vistazo y aprovecha sus virtudes, estaremos atentos a cualquier comentario o sugerencia que nos permita merojar cada día mas!!!</p>
    </div>
  );
}
