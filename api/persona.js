import { API_PATH_PREFIX_EXCLUDE_VERSION,API_VERSION } from "./config";

export async function getPersonasApi(limit, page) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-personas?limit=${limit}&page=${page}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}

export async function deletePersonaApi(token, id_persona) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/delete-persona/${id_persona}`;

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

export async function addPersonaApi(token, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/add-persona`;

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

export async function updatePersonaApi(token, id_persona, data) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/update-persona/${id_persona}`;

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

export async function getPersonaApi(id_persona) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/get-persona/${id_persona}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
  catch (err) {
    return err;
  }
}
