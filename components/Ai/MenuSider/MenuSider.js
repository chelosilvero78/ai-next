import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  SnippetsOutlined, FileOutlined, UserOutlined, CarryOutOutlined,
  TeamOutlined, BookOutlined, MenuOutlined, MessageOutlined, SearchOutlined,
  WechatOutlined, PlusSquareOutlined
} from "@ant-design/icons";

function MenuSider(props) {
  // const { menuCollapsed, location } = props;
  const { menuCollapsed, } = props;
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
            <Link href="/ai/actividades">
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
            <Link href="/ai/personas">
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
            <Link href="/ai/tareas">
              <a>
                <CarryOutOutlined />
                <span>Tareas</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="21">
            <Link href="/ai/arqueo-pagares">
              <a>
                <CarryOutOutlined />
                <span>Arqueo Pagares</span>
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="22">
          <Link href="/ai/users">
            <a>
              <TeamOutlined />
              <span className="nac-text">Usuarios</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="23">
          <Link href="/ai/menu">
            <a>
              <MenuOutlined />
              <span className="nac-text">Menú</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="24">
          <Link href="/ai/informes">
            <a>
              <BookOutlined />
              <span className="nac-text">Informes</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="25">
          <Link href="/ai/blog">
            <a>
              <MessageOutlined />
              <span className="nac-text">Blog</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="26">
          <Link href="/ai/persona">
            <a>
              <UserOutlined />
              <span className="nac-text">Persona</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="27">
          <Link href="/ai/stepform">
            <a>
              <PlusSquareOutlined />
              <span className="nac-text">Stepform</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="28">
          <Link href="/ai/autocompleteform">
            <a>
              <SearchOutlined />
              <span className="nac-text">autocompleteform</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="29">
          <Link href="/ai/chat">
            <a>
              <WechatOutlined />
              <span className="nac-text">chat</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="30">
          <Link href="/ai/band-app">
            <a>
              <WechatOutlined />
              <span className="nac-text">Votar</span>
            </a>
          </Link>
        </Menu.Item>
      </Menu>

    </Sider>
  );
}

export default withRouter(MenuSider);