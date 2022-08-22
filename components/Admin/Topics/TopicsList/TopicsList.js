import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditTopicForm from "../AddEditTopicForm";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getTopicDataAiApi,
  deleteTopicApi,
  updateTopicApi
} from "../../../../api/topic";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./TopicsList.scss";

const { confirm } = ModalAntd;

export default function TopicsList(props) {
  const { topics, setReloadTopics } = props;
  const [listTopics, setListTopics] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listTopicArray = [];
    topics.forEach(topic => {
      listTopicArray.push({
        content: (
          <Topic
            topic={topic}
            deleteTopic={deleteTopic}
            editTopicModal={editTopicModal}
          />
        )
      });
    });
    setListTopics(listTopicArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.topic;
      const order = item.rank;
      updateTopicApi(accessToken, _id, { order });
    });
  };

  const addTopicModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo topico");
    setModalContent(
      <AddEditTopicForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadTopics={setReloadTopics}
      />
    );
  };

  const editTopicModal = topic => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando topico");
    setModalContent(
      <AddEditTopicForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadTopics={setReloadTopics}
        topic={topic}
      />
    );
  };

  const deleteTopic = topic => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estas seguro de que quieres eliminar el topico ${topic.idTopic}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTopicApi(accesToken, topic._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadTopics(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde."
            });
          });
      }
    });
  };

  return (
    <div className="topics-list">
      <div className="topics-list__header">
        <Button type="primary" onClick={addTopicModal}>
          Nuevo topico
        </Button>
      </div>

      <div className="topics-list__items">
        {listTopics.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes topicos creados
          </h2>
        )}
        <DragSortableList items={listTopics} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Topic(props) {
  const { topic, deleteTopic, editTopicModal } = props;
  const [topicData, setTopicData] = useState(null);

  useEffect(() => {
    getTopicDataAiApi(topic.idTopic).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El topic con el id ${topic.idTopic} no se ha encontrado.`
        });
      }
      setTopicData(response.data);
    });
  }, [topic]);

  if (!topicData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editTopicModal(topic)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteTopic(topic)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
      <img
        src={topicData.image_480x270}
        alt={topicData.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`${topicData.title} | ID: ${topic.idTopic}`}
        description={topicData.headline}
      />
    </List.Item>
  );
}
