const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/*<a href="https://sancristobal.coop.py" class="navbar-brand">AICSC</a>*/}
          <a className="navbar-brand" href="https://www.sancristobal.coop.py">
            AICSC
                </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li className="active">
              <a href="#">
                <span
                  id="boton-notificaciones"
                  className="fas fa-bell badge pull-right"
                >
                  5
                      </span>
              </a>
            </li>
          </ul>
          {/*desde aqui agregado 20190412_1118*/}
          <ul className="nav navbar-nav navbar-right" id="sesion_display">
            <li className="dropdown open">
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="true"
              >
                <span className="fas fa-user" />
                <span className="micuenta">Mi Cuenta</span>
                <span className="caret" />
              </a>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a href="#">
                    <span className="fas fa-user" />
                    <span id="susuario_usuario" />
                  </a>
                </li>
                <li>
                  <a href="#" id="cambiar_clave">
                    <span className="fas fa-user-edit" />
                          Cambiar Clave
                        </a>
                </li>
                <li className="divider" />
                <li>
                  <a href="#" id="refrescar">
                    <span className="fas fa-sync-alt"></span>Refrescar
                        </a>
                </li>
                <li>
                  <a href="#" id="cerrar_sesion">
                    <span className="fas fa-sign-out-alt"></span>Salir
                        </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
