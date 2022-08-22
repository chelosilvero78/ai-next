import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { SnippetsOutlined, FileOutlined, UserOutlined, CarryOutOutlined, 
  TeamOutlined, BookOutlined, MenuOutlined,MessageOutlined,SearchOutlined,
  WechatOutlined, PlusSquareOutlined  } from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
  // const { menuCollapsed, location } = props;
  const { menuCollapsed,} = props;
  const { Sider } = Layout;
  const { SubMenu } = Menu;

  // const [toggleCollapsed, setToggleCollapsed] = useState({
  //   collapsed: false,
  // });

  // const changeToggleCollapsed = () => {
  //   setToggleCollapsed({
  //     ...toggleCollapsed,
  //     toggleCollapsed: !toggleCollapsed,
  //   });
  // };
  
  //const {WhatsAppOutlined}=Icon
  return (
    <Sider className="ai-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={[location.pathname]}
        defaultSelectedKeys={["/ai/users"]}
      >
        <SubMenu
          key="Archivos"
          title={
            <span>
              <FileOutlined />
              <span>Archivos</span>
            </span>
          }
        >
          <Menu.Item key="5">
            <Link to="/ai/actividades">
              <SnippetsOutlined />
              <span>Actividades</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">Actividad Tipos</Menu.Item>
          <Menu.Item key="7">Objetos</Menu.Item>
          <Menu.Item key="8">Rubros</Menu.Item>
          <Menu.Item key="9">Sub-Rubros</Menu.Item>
          <Menu.Item key="10">Rubrodetalle</Menu.Item>
          <Menu.Item key="11">Sectores</Menu.Item>
          <Menu.Item key="12">Locales</Menu.Item>
          <Menu.Item key="13">Ciudades</Menu.Item>
          <Menu.Item key="14">Departamentos</Menu.Item>
          <Menu.Item key="15">
            <Link to="/ai/personas">
              <UserOutlined />
              <span>Personas</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="16">Personas-Asignables</Menu.Item>
        </SubMenu>
        <SubMenu
          key="17"
          title={
            <span>
              <CarryOutOutlined />
              <span>Procesos</span>
            </span>
          }
        >
          <Menu.Item key="18">Tareas Administrador</Menu.Item>
          <Menu.Item key="19">Subir Legajos</Menu.Item>
          <Menu.Item key="20">
            <Link to="/ai/tareas">
              <CarryOutOutlined />
              <span>Tareas</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="21">
            <Link to="/ai/arqueo-pagares">
              <CarryOutOutlined />
              <span>Arqueo Pagares</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="22">
          <Link to="/ai/users">
            <TeamOutlined />
            <span className="nac-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="23">
          <Link to="/ai/menu">
            <MenuOutlined />
            <span className="nac-text">Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="24">
          <Link to="/ai/informes">
            <BookOutlined />
            <span className="nac-text">Informes</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="25">
          <Link to="/ai/blog">
            <MessageOutlined />
            <span className="nac-text">Blog</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="26">
          <Link to="/ai/persona">
            <UserOutlined />
            <span className="nac-text">Persona</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="27">
          <Link to="/ai/stepform">
            <PlusSquareOutlined />
            <span className="nac-text">Stepform</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="28">
          <Link to="/ai/autocompleteform">
            <SearchOutlined />
            <span className="nac-text">autocompleteform</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="29">
          <Link to="/ai/chat">
            <WechatOutlined />
            <span className="nac-text">chat</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="30">
          <Link to="/ai/band-app">
            <WechatOutlined />
            <span className="nac-text">Votar</span>
          </Link>
        </Menu.Item>
      </Menu>
      
    </Sider>
  );
}

export default withRouter(MenuSider);