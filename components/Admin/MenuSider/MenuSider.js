import Link from "next/link";
import { Layout, Menu } from "antd";
import { UserOutlined, MenuOutlined, BookOutlined, MessageOutlined } from '@ant-design/icons';


function MenuSider(props) {
  // const { menuCollapsed, location } = props;
  const { menuCollapsed, } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={[location.pathname]}
        defaultSelectedKeys={["/admin/users"]}
      >
        {/* <Menu.Item key="/admin">
          <Link href="/admin">
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/admin/users">
          <Link href="/admin/users">
            <a>
              <UserOutlined />
              <span className="nac-text">Usuarios</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menuweb">
          <Link href="/admin/menuweb">
            <a>
              <MenuOutlined />
              <span className="nac-text">Menú</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/topics">
          <Link href="/admin/topics">
            <a>
              <BookOutlined />
              <span className="nac-text">Cursos</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/blog">
          <Link href="/admin/blog">
            <a>
              <MessageOutlined />
              <span className="nac-text">Blog</span>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
