import React from "react";
import { Button } from "antd";
import AiLogo from "../../../assets/img/png/logo.png";
// import { logout } from "../../../api/auth";  //--> inicailmente del modelo de agustin--> ahora deshabilitado
import { useDispatch } from 'react-redux';
import { logout } from '../../../stores/actions/authActions';  //redux
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    window.location.reload(); //--> inicialmente-->modelo agustin navarro, ahora con redux lo saco
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
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
