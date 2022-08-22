import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import {
  updateMenuwebApi,
  activateMenuwebApi,
  deleteMenuwebApi,
} from "../../../../api/menuweb";
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menuweb, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listItemsArray = [];
    menuweb.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuwebItem
            item={item}
            activateMenuweb={activateMenuweb}
            editMenuWebModal={editMenuWebModal}
            deleteMenuweb={deleteMenuweb}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuweb]);

  const activateMenuweb = (menuweb, status) => {
    const accesToken = getAccessTokenApi();
    activateMenuwebApi(accesToken, menuweb._id, status).then((response) => {
      notification["success"]({
        message: response,
      });
    });
  };

  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuwebApi(accesToken, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  const deleteMenuweb = (menuweb) => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando menu web",
      content: `¿Estas seguro de que quieres eliminar el menu ${menuweb.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMenuwebApi(accesToken, menuweb._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadMenuWeb(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde.",
            });
          });
      },
    });
  };

  const editMenuWebModal = (menuweb) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menuweb: ${menuweb.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menuweb={menuweb}
      />
    );
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>
          Crear menú
        </Button>
      </div>

      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
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

function MenuwebItem(props) {
  const { item, activateMenuweb, editMenuWebModal, deleteMenuweb } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenuweb(item, e)}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteMenuweb(item)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
