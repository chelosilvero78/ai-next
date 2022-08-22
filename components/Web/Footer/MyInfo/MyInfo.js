import LogoWhite from "../../../../assets/img/png/logo.png";
import SocialLink from "../../SocialLinks";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Auditoria Interna" />
      <span>AI-CSC</span>
      <h4 className="my-info_info-item">
        Los valores del Auditor van desde el principio de independencia, la
        objetividad, integridad profesional, rango de conocimiento, honestidad,
        cumplimiento, lealtad, imparcialidad, responsabilidad, confiabilidad,
        discreción y confidencialidad.
      </h4>
      <SocialLink />
    </div>
  );
}
