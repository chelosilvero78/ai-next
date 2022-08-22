import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from 'next/link'
import SocialLinks from "../SocialLinks";
import { getMenuwebApi } from "../../../api/menuweb";
import logoWhite from "../../../assets/img/png/logo.png";


export default function MenuwebTop() {
  const [menuwebData, setMenuwebData] = useState([]);

  useEffect(() => {
    getMenuwebApi().then((response) => {
      const arrayMenuweb = [];
      response.menuweb.forEach((item) => {
        item.active && arrayMenuweb.push(item);
      });
      setMenuwebData(arrayMenuweb);
    });
  }, []);

  return (
    <Menu className="menuweb-top-web" mode="horizontal">
      <Menu.Item className="menuweb-top-web__logo">
        <Link href={"/"}>
          <img src={logoWhite} alt="Auditoria Interna" />
          AI
        </Link>
      </Menu.Item>

      {menuwebData.map((item) => {
        const external = item.url.indexOf("http") > -1 ? true : false;
        if (external) {
          return (
            <Menu.Item key={item._id} className="menuweb-top-web__item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={item._id} className="menuweb-top-web__item">
            <Link href={item.url}><a>{item.title}</a></Link>
          </Menu.Item>
        );
      })}

      <SocialLinks />
    </Menu>
  );
}
