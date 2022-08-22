import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getTopicDataAiApi } from "../../../../api/topic";

import "./TopicsList.scss";

export default function TopicsList(props) {
  const { topics } = props;

  return (
    <div className="topics-list">
      <Row>
        {topics.map(topic => (
          <Col key={topic._id} md={8} className="topics-list__topic">
            <Topic topic={topic} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Topic(props) {
  const { topic } = props;
  const [topicInfo, setTopicInfo] = useState({});
  const [urlTopic, setUrlTopic] = useState("");
  const { Meta } = Card;

  useEffect(() => {
    getTopicDataAiApi(topic.idTopic)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setTopicInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, inténtelo más tarde."
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const mountUrl = url => {
    if (!topic.link) {
      //const baseUrl = `https://www.udemy.com${url}`;
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (topic.coupon ? `?couponCode=${topic.coupon}` : "");
      setUrlTopic(finalUrl);
    } else {
      setUrlTopic(topic.link);
    }
  };

  return (
    <a href={urlTopic} target="_blank" rel="noopener noreferrer">
      <Card
        cover={<img src={topicInfo.image_480x270} alt={topicInfo.title} />}
      >
        <Meta title={topicInfo.title} description={topicInfo.headline} />
        <Button>Ver Topico</Button>
        <div className="topics-list__topic-footer">
          <span>{topic.price ? ` Gs. ${topic.price}` : topicInfo.price}</span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
