const Sidebar = () => {
  return (
    <nav id="sidebar" className="animated bounceInRight">
      <ul id="menu" className="">
        <li>
          <a className="btn btn-xm btn-success" href="#">
            <i className="fa fa-home">Ai System</i>
          </a>
          <i className="fa fa-home">
            <ul>
              <li>
                Auditoria Interna
        <ul>
                  <li>
                    Archivos
            <ul>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/actividad/index.html')">
                        <a href="#">Actividad</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/actividadtipo/index.html')">
                        <a href="#">Actividad Tipo</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/objeto/index.html')">
                        <a href="#">Objeto</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/rubro/index.html')">
                        <a href="#">Rubro</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/rubrosub/index.html')">
                        <a href="#">Rubrosub</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/rubrodetalle/index.html')">
                        <a href="#">Rubrodetalle</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/sectores/index.html')">
                        <a href="#">Sectores</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/locales/index.html')">
                        <a href="#">Locales</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/ciudades/index.html')">
                        <a href="#">Ciudades</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/departamentos/index.html')">
                        <a href="#">Departamentos</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/personas/index.html')">
                        <a href="#">Personas</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/archivos/personasignable/index.html')">
                        <a href="#">Persona Asignable</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Procesos
            <ul>
                      <li onclick="cargar_formulario('frm/auditoriainterna/procesos/tareas/index.html')">
                        <a href="#">Tareas Administrador</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/procesos/legajossubir/index.html')">
                        <a href="#">Subir Legajos</a>
                      </li>
                      <li onclick="cargar_formulario('frm/auditoriainterna/procesos/tareasusuario/index.html')">
                        <a href="#">Tareas</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Informes
            <ul>
                      <li onclick="cargar_formulario('frm/monitoractividades/index.html')">
                        <a href="#">Monitor en Tiempo Real</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Comunicacion
            <ul>
                      <li onclick="cargar_formulario('frm/websocket/dashboardEdTeam/index.html')">
                        <a href="#">dashboard</a>
                      </li>
                      <li onclick="cargar_formulario('frm/websocket/chat/index.html')">
                        <a href="#">chat</a>
                      </li>
                      <li onclick="cargar_formulario('frm/websocket/EchoBinary')">
                        <a href="#">EchoSendBinary</a>
                      </li>
                      <li onclick="cargar_formulario('null')">
                        <a href="#">Web Socket Cam</a>
                      </li>
                      <li onclick="cargar_formulario('null')">
                        <a href="#">Fotos</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Test
            <ul>
                      <li onclick="cargar_formulario('frm/prueba/excel/4-Excel_Export_Download_url.html')">
                        <a href="#">4-Excel Export Json</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </i>
        </li>

      </ul>
    </nav>
  )
}

export default Sidebar
