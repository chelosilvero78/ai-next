import Link from 'next/link'

import { DarkLayout } from '../components/layouts/DarkLayout'
import { MainLayout } from '../components/layouts/MainLayout'


export default function AboutPage() {
  return (
    <main>
      <div id="barra-herramientas" className="animated fadeInDown">
        <span
          id="boton-menu"
          className="fas fa-angle-double-left float-izquierda"
          aria-hidden="true"
        ></span>
        <ol className="breadcrumb float-izquierda">
          <li>
            <a href="#" id="s_nombre_empresa" />
          </li>
          <li>
            <a href="#" id="s_nombre_sucursal" />
          </li>
          <li>
            <a href="#" id="s_usuario_usuario" />
          </li>
          <li>
            <a href="#" id="s_nombre_rol" />
          </li>
          <li id="s_nombre_formulario" className="active">
            Menu
            </li>
          <li id="s_id_usuario" style={{ display: "none" }}>
            0
            </li>
          <li id="s_id_sucursal" style={{ display: "none" }}>
            0
            </li>
          <li id="s_direccion_sucursal" style={{ display: "none" }} />
          <li id="s_telefono_sucursal" style={{ display: "none" }} />
          <li id="s_ruc_empresa" style={{ display: "none" }} />
        </ol>
      </div>
      <div id="formularios"></div>
      <div id="react-app"></div>
    </main>

  )
}


AboutPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <DarkLayout>
        {page}
      </DarkLayout>
    </MainLayout>
  )
}