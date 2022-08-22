import { API_PATH_PREFIX_EXCLUDE_VERSION, API_VERSION } from "./config";

export async function getTipodocsApi(limit, page) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-tipodocs?limit=${limit}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}

export async function deleteTipodocApi(token, id_tipodoc) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/delete-tipodoc/${id_tipodoc}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}

export async function addTipodocApi(token, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/add-tipodoc`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}

export async function updateTipodocApi(token, id_tipodoc, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/update-tipodoc/${id_tipodoc}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}

export async function getTipodocApi(id_tipodoc) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-tipodoc/${id_tipodoc}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}
