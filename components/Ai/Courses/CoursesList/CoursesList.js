import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getTopicDataAiApi,
  deleteTopicApi,
  updateTopicApi
} from "../../../../api/topic";
import { EditOutlined,DeleteOutlined} from "@ant-design/icons";

import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCourseArray = [];
    courses.forEach(topic => {
      listCourseArray.push({
        content: (
          <Course
            topic={topic}
            deleteTopic={deleteTopic}
            editTopicModal={editTopicModal}
          />
        )
      });
    });
    setListCourses(listCourseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.topic;
      const order = item.rank;
      updateTopicApi(accessToken, _id, { order });
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editTopicModal = topic => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        topic={topic}
      />
    );
  };

  const deleteTopic = topic => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estas seguro de que quieres eliminar el curso ${topic.idTopic}?`,
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
            setReloadCourses(true);
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
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo curso
        </Button>
      </div>

      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
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

function Course(props) {
  const { topic, deleteTopic, editTopicModal } = props;
  const [topicData, setTopicData] = useState(null);

  useEffect(() => {
    getTopicDataAiApi(topic.idCourse).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El curso con el id ${topic.idCourse} no se ha encontrado.`
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
        title={`${topicData.title} | ID: ${topic.idCourse}`}
        description={topicData.headline}
      />
    </List.Item>
  );
}
