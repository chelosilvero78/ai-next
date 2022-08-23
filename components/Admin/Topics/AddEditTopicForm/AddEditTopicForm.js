import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addTopicApi, updateTopicApi } from "../../../../api/topic";
import { KeyOutlined, LinkOutlined,GifOutlined, DollarOutlined  } from "@ant-design/icons";

export default function AddEditTopicForm(props) {
  const { setIsVisibleModal, setReloadTopics, topic } = props;
  const [topicData, setTopicData] = useState({});

  useEffect(() => {
    topic ? setTopicData(topic) : setTopicData({});
  }, [topic]);

  const addTopic = e => {
    e.preventDefault();

    if (!topicData.idTopic) {
      notification["error"]({
        message: "El id del topico es obligatorio"
      });
    } else {
      const accessToken = getAccessTokenApi();

      addTopicApi(accessToken, topicData)
        .then(response => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message
          });
          setIsVisibleModal(false);
          setReloadTopics(true);
          setTopicData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          });
        });
    }
  };

  const updateTopic = e => {
    e.preventDefault();

    const accessToken = getAccessTokenApi();

    updateTopicApi(accessToken, topic._id, topicData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadTopics(true);
        setTopicData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, intentelo más tarde."
        });
      });
  };

  return (
    <div className="add-edit-topic-form">
      <AddEditForm
        topic={topic}
        addTopic={addTopic}
        updateTopic={updateTopic}
        topicData={topicData}
        setTopicData={setTopicData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { topic, addTopic, updateTopic, topicData, setTopicData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={topic ? updateTopic : addTopic}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del topico"
          value={topicData.idTopic}
          onChange={e =>
            setTopicData({ ...topicData, idTopic: e.target.value })
          }
          disabled={topic ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url del topico"
          value={topicData.link}
          onChange={e => setTopicData({ ...topicData, link: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GifOutlined />}
          placeholder="Cupon de descuento"
          value={topicData.coupon}
          onChange={e =>
            setTopicData({ ...topicData, coupon: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarOutlined />}
          placeholder="Precio del topico"
          value={topicData.price}
          onChange={e =>
            setTopicData({ ...topicData, price: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {topic ? "Actualizar topico" : "Crear topico"}
        </Button>
      </Form.Item>
    </Form>
  );
}
