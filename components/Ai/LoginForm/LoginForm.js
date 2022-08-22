import React, { useState,useEffect } from "react";
//import { Form, Icon, Input, Button, notification, Avatar, Image } from "antd";
import { Form, Input, Button, /*notification*/ } from "antd";
import { LoginOutlined, LogoutOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
// import { signInApi } from "../../../api/user";
//import Logo from "../../../assets/img/png/logo.png";

import { login as loginUser } from '../../../stores/actions/authActions';  //redux
import "./LoginForm.scss";

// export default function LoginForm() {     //--> inicialmente sin --> {location,history}-->modelo agustin
// export default function LoginForm(props) {
export default function LoginForm({ location, history }) {   //--> adoptado del Brad model
  // const { location, history }=props
  const [inputs, setInputs] = useState({email: "", password: "" });
  const dispatch = useDispatch();  //nos va a permitir llamar acciones de redux  :)
  const {userInfo:user} = useSelector((state) => state.authLogin)
  const redirect = location.search ? location.search.split('=')[1] : '/ai' //lo que viene en search |o| raiz
  useEffect(() => {
    //si existe usuario, puedes redireccionar a seach |o| raiz
    if (user) {
      history.push(redirect)
    }
  }, [history, user, redirect])


  const changeForm = (e) => {
    setInputs({...inputs,[e.target.name]: e.target.value});
  };

  const login = async (e) => {
    e.preventDefault();
    // dispatch( startLogin( lEmail, lPassword ) ) //-->modelo de fernando herrera
    // dispatch(login(email, password))  //-->modelo Brad Traversy
    const { email, password } = inputs
    dispatch(loginUser(email, password))  //-->masr

    // const result = await signInApi(inputs);

    // if (result.message) {
    //   notification["error"]({
    //     message: result.message,
    //   });
    // } else {
    //   const { accessToken, refreshToken } = result;
    //   localStorage.setItem(ACCESS_TOKEN, accessToken);
    //   localStorage.setItem(REFRESH_TOKEN, refreshToken);


    //   notification["success"]({
    //     message: "Login correcto.",
    //   });

    //   window.location.href = "/ai";
    // }

    // console.log("result-->",result);
  };
  const exitAndGoHome = (params) => {
    window.location.href = "/";
  };

  return (
    <Form className="login-form" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item className="login-form__button">
        <Button htmlType="submit" className="login-form__button-ok">
          <LoginOutlined />
          Entrar
        </Button>
        <Button
          type="primary"
          className="login-form__button-exit"
          onClick={() => exitAndGoHome()}
        >
          <LogoutOutlined />
          Salir
        </Button>
      </Form.Item>
    </Form>
  );
}

//================================================================================================
//---------------------------------------------de ai-anterior-------------------------------------
//================================================================================================
//------------------------------------------------
//imports de pages/SignIn/SignIn.js
//import Logo from "../../../assets/img/png/logo.png";
//import LoginForm from "../../../components/Ai/LoginForm";
//import { getAccessTokenApi } from "../../../api/auth";
//import { ajax } from "../../../api/ai";
//import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
//-----------
//import * as MyFn from "../../../utils/commons/funciones";
//let inicializar_formulario_acceso = MyFn.inicializar_formulario_acceso;
//let validar_acceso = MyFn.validar_acceso;
//-----------
//import { useEffect } from "react";
// useEffect(() => {
//   inicializar_formulario_acceso();
// }, []);
//----------------------------------------------------


// <div id="pagina-acceso">
// <div id="panel-acceso">
//   <form id="form_acceso">
///////     <img src={Logo} alt="AI" className="logo" />
//     <div className="input-group input-group-sm">
//       <div className="input-group-prepend">
//         <span className="input-group-text" aria-hidden="true">
//           <i className="fa fa-user"></i>
//         </span>
//       </div>
//       <input
//         id="usuario_usuario"
//         name="usuario_usuario"
//         autoComplete="off"
//         type="text"
//         className="form-control"
//         placeholder="Usuario"
//         aria-describedby="sizing-addon-usuario"
//       />
//     </div>
//     <div className="input-group input-group-sm">
//       <div className="input-group-prepend">
//         <span className="input-group-text" aria-hidden="true">
//           <i className="fa fa-lock"></i>
//         </span>
//       </div>
//       <input
//         id="clave_usuario"
//         name="clave_usuario"
//         autoComplete="off"
//         type="password"
//         className="form-control"
//         placeholder="Contraseña"
//         aria-describedby="sizing-addon-clave"
//       />
//     </div>

//     <div
//       className="btn-group btn-group-justified"
//       role="group"
//       aria-label="..."
//     >
//       <button
//         onClick={validar_acceso}
//         id="boton-ingresar"
//         type="Button"
//         className="btn btn-primary"
//       >
//         <i className="fa fa-sign-in-alt p-1" aria-hidden="true"></i>
//         Ingresar
//       </button>

//       <button
//         onClick="salir_acceso()"
//         id="boton-salir"
//         type="Button"
//         className="btn btn-danger"
//       >
//         <i className="fa fa-sign-out-alt p-1" aria-hidden="true"></i>
//         Salir
//       </button>
//     </div>
//   </form>
// </div>
// </div>