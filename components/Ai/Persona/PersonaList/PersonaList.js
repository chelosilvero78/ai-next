import { List, Button, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePersonaApi } from "../../../../api/persona";
import { EyeOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export default function PersonaList(props) {
  const { personas, setReloadPersonas, editPersona } = props;
  console.log("persona-->",personas)

  const deletePersona = persona => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando persona",
      content: `¿Estas segurod de eliminar el persona ${persona.fullName}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePersonaApi(accessToken, persona.id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadPersonas(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor."
            });
          });
      }
    });
  };

  return (
    <div className="persona-list">
      <List
        dataSource={personas.data.rows}
        renderItem={persona => (
          <Persona persona={persona} deletePersona={deletePersona} editPersona={editPersona} />
        )}
      />
    </div>
  );
}

function Persona(props) {
  const { persona, deletePersona, editPersona } = props;

  return (
    <List.Item
      actions={[
        <Link key="1" href={`/persona/${persona.id}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,
        <Button key="2" type="primary" onClick={() => editPersona(persona)}>
          <EditOutlined />
        </Button>,
        <Button key="3" type="danger" onClick={() => deletePersona(persona)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={persona.fullName} />
    </List.Item>
  );
}
