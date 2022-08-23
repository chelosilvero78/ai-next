import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { updateMenuwebApi } from "../../../../api/menuweb";
import { getAccessTokenApi } from "../../../../api/auth";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";

export default function EditMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb, menuweb } = props;
  const [menuWebData, setMenuWebData] = useState(menuweb);

  useEffect(() => {
    setMenuWebData(menuweb);
  }, [menuweb]);

  const editMenuweb = (event) => {
    event.preventDefault();

    if (!menuWebData.title || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      const accesToken = getAccessTokenApi();

      updateMenuwebApi(accesToken, menuWebData._id, menuWebData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde.",
          });
        });
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        editMenuweb={editMenuweb}
      />
    </div>
  );
}

function EditForm(props) {
  const { menuWebData, setMenuWebData, editMenuweb } = props;

  return (
    <Form className="form-edit" onSubmit={editMenuweb}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar menuweb
        </Button>
      </Form.Item>
    </Form>
  );
}
