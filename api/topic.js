import { API_PATH_PREFIX_EXCLUDE_VERSION, API_VERSION } from "./config";

export function getTopicsApi() {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-topics`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function getTopicDataAiApi(id) {
  // const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
  const baseUrl = `http://localhost:9999/actividad/buscar/nombre?buscar_texto=${id}&pagina=1`;
  // const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
  const TopicsParams = `?buscar_texto=${id},pagina=1`;
  const url = baseUrl + TopicsParams;

  return fetch(url)
    .then(async response => {
      return { code: response.status, data: await response.json() };
    })
    .then(result => {
      console.log("result-->",result)
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function deleteTopicApi(token, id) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/delete-topic/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function addTopicApi(token, topic) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/add-topic`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(topic)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function updateTopicApi(token, id, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/update-topic/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}
