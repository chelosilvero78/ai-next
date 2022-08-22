const BarraHerramientas = () => {
  return (
    <div id="barra-herramientas" className="animated fadeInDown">
  <span
    id="boton-menu"
    className="fas fa-angle-double-left float-izquierda"
    aria-hidden="true"
  ></span>
  <ol className="breadcrumb float-izquierda">
    <li>
      <a href="#" id="s_nombre_empresa">
        Cooperativa Multiactiva San Cristobal Ltda.
      </a>
    </li>
    <li>
      <a href="#" id="s_nombre_sucursal">
        Casa Central
      </a>
    </li>
    <li>
      <a href="#" id="s_usuario_usuario">
        Marcelo
      </a>
    </li>
    <li>
      <a href="#" id="s_nombre_rol">
        Auditor
      </a>
    </li>
    <li id="s_nombre_formulario" className="active">
      Menu
    </li>
    <li id="s_id_usuario" style={{ display: "none" }}>
      1
    </li>
    <li id="s_id_sucursal" style={{ display: "none" }}>
      1
    </li>
    <li id="s_direccion_sucursal" style={{ display: "none" }}>
      Denis Roa y Del Maestro
    </li>
    <li id="s_telefono_sucursal" style={{ display: "none" }}>
      +595 21 617 9000 R.A.
    </li>
    <li id="s_ruc_empresa" style={{ display: "none" }}>
      80016760-0
    </li>
  </ol>
</div>

  )
}

export default BarraHerramientas;
