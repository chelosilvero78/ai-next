import React, {useContext} from "react";
import { Button} from "antd";
import AiLogo from "../../../assets/img/png/logo.png";
// import { logout } from "../../../api/auth";
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../../stores/actions/authActions';  //redux
import {SocketContext} from '../../../context/SocketContext';
import { MenuFoldOutlined,MenuUnfoldOutlined,WifiOutlined, PoweroffOutlined} from "@ant-design/icons";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const auth = useSelector((state) => state.authLogin)
  const { menuCollapsed, setMenuCollapsed } = props;
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  const logoutUser = () => {
      dispatch(logout());
      //window.location.reload(); //--> inicialmente-->modelo agustin navarro, ahora con redux lo saco
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={AiLogo}
          alt="Auditoria Interna"
        />
        AI-CSC
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined />: <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type={(socket?.connected)?"primary":"link"} >
          <WifiOutlined />
          {auth.loggedIn?auth.name:""}
        </Button>
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
