import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";  //--> inicialmente--> modelo agustin navarro
// import { signInApi } from "../../../api/user";  //--> inicialmente--> modelo agustin navarro
import { login as loginUser } from '../../../stores/actions/authActions';  //redux
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined,LockOutlined } from '@ant-design/icons';

import "./LoginForm.scss";

export default function LoginForm({location, history}) {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const dispatch = useDispatch();  //nos va a permitir llamar acciones de redux  :)
  const { userInfo: user } = useSelector((state) => state.authLogin)
  const redirect = location.search ? location.search.split('=')[1] : '/admin' //lo que viene en search |o| raiz
  useEffect(() => {
    //si existe usuario, puedes redireccionar a seach |o| raiz
    if (user) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = inputs
    dispatch(loginUser(email, password))  //-->masr
    window.location.href = "/admin";
    // const result = await signInApi(inputs);
    // //si se recibe algun result.message--> existe algun error
    // if (result.message) {
    //   notification["error"]({
    //     message: result.message,
    //   });
    // } else {
    //   //todo correcto
    //   const { accessToken, refreshToken } = result;
    //   localStorage.setItem(ACCESS_TOKEN, accessToken);
    //   localStorage.setItem(REFRESH_TOKEN, refreshToken);

    //   notification["success"]({
    //     message: "Login correcto.",
    //   });
    //   window.location.href = "/admin";
    // }
  };

  return (
    <Form className="login-form" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }}/>}
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
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}