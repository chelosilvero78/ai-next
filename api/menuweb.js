import { API_PATH_PREFIX_EXCLUDE_VERSION,API_VERSION } from "./config";

export function getMenuwebApi() {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-menuwebs`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateMenuwebApi(token, menuwebId, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/update-menuweb/${menuwebId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
}

export function activateMenuwebApi(token, menuwebId, status) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/activate-menuweb/${menuwebId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addMenuwebApi(token, menuweb) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/add-menuweb`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(menuweb),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteMenuwebApi(token, menuwebId) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/delete-menuweb/${menuwebId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      console.log(err);
    });
}
