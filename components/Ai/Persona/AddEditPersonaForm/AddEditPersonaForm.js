import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification
} from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPersonaApi, updatePersonaApi } from "../../../../api/persona";
import { getTipodocsApi } from "../../../../api/tipodoc";
import { LinkOutlined,FontSizeOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function AddEditPersonaForm(props) {
  const { setIsVisibleModal, setReloadPersona, persona,location } = props;
  const [personaData, setPersonaData] = useState({});
  const [tipodocData, setTipodocData] = useState(null);
  const [addEditMode, setAddEditMode] = useState(false);
  //const { page = pageDefault,limit=limitDefault } = queryString.parse(location.search);

  //estado de persona data
  useEffect(() => {
    if (persona) {
      setPersonaData(persona);
    } else {
      setPersonaData({});
    }
  }, [persona]);

  //tipo de documento
  useEffect(() => {
    getTipodocsApi(10, 1)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          console.log(response)
          setTipodocData(response);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
    setAddEditMode(true);
  }, [addEditMode]);

  const processPersona = e => {
    e.preventDefault();
    const {     
      id_tipodoc,
      documento_persona,
      nombres_persona,
      apellidos_persona,
      sexo_persona,
      fechanacimiento_persona,
      estadocivil_persona,
      direccion_persona,
      telefono_persona,
      email_persona,
      www_persona,
      id_personatipo,
      numerosocio_persona,
      numeroempleado_persona,
      longitud_persona,
      latitud_persona,
      foto_persona,
      limite_persona
    } = personaData;

    if (!documento_persona || !nombres_persona || !apellidos_persona) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else {
      if (!persona) {
        addPersona();
      } else {
        updatePersona();
      }
    }
  };

  const addPersona = () => {
    const token = getAccessTokenApi();

    addPersonaApi(token, personaData)
      .then(response => {
        setReloadPersona(true);
        setPersonaData({});

      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
  };

  const updatePersona = () => {
    const token = getAccessTokenApi();
    updatePersonaApi(token, persona.id, personaData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadPersona(true);
        setPersonaData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
  };

  return (
    <div className="add-edit-persona-form">
      <AddEditForm
        personaData={personaData}
        setPersonaData={setPersonaData}
        persona={persona}
        processPersona={processPersona}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { personaData, setPersonaData, persona, processPersona } = props;


  /*
    id_tipodoc,
      documento_persona,
      nombres_persona,
      apellidos_persona,
      sexo_persona,
      fechanacimiento_persona,
      estadocivil_persona,
      direccion_persona,
      telefono_persona,
      email_persona,
      www_persona,
      id_personatipo,
      numerosocio_persona,
      numeroempleado_persona,
      longitud_persona,
      latitud_persona,
      foto_persona,
      limite_persona
  */
  return (
    <Form className="add-edit-persona-form" layout="inline" onSubmit={processPersona}>
      <Row gutter={24}>
        <Col span={8}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecionar tipo de documento"
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {
              this.tipodocData.map((tipodoc, index) => (
                <Option key={index} value={tipodoc.id_tipodoc}>
                  {tipodoc.nombre_tipodoc}
                </Option>
              ))
            }
          </Select>
        </Col>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Tipodoc"
            value={personaData.id_tipodoc}
            onChange={e => setPersonaData({ ...personaData, id_tipodoc: e.target.value })}
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="documento"
            value={personaData.documento_persona}
            onChange={e =>
              setPersonaData({
                ...personaData,
                documento_persona:e.target.value
              })
            }
          />
        </Col>
      </Row>
      <Row gutter={24}>
      <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="documento"
            value={personaData.nombres_persona}
            onChange={e =>
              setPersonaData({
                ...personaData,
                nombres_persona:e.target.value
              })
            }
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Tipodoc"
            value={personaData.apellidos_persona}
            onChange={e => setPersonaData({ ...personaData, apellidos_persona: e.target.value })}
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Tipodoc"
            value={personaData.id_tipodoc}
            onChange={e => setPersonaData({ ...personaData, id_tipodoc: e.target.value })}
          />
        </Col>
      </Row>

      <Editor
        value={personaData.description ? personaData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help"
        }}
        onBlur={e =>
          setPersonaData({ ...personaData, description: e.target.getContent() })
        }
      />


        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            value={personaData.date && moment(personaData.date)}
            onChange={(e, value) =>
              setPersonaData({
                ...personaData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
              })
            }
          />
        </Col>

      <Button type="primary" htmlType="submit" className="btn-submit">
        {persona ? "Actualizar persona" : "Crear persona"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
