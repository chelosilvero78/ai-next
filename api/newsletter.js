import { API_PATH_PREFIX_EXCLUDE_VERSION, API_VERSION } from "./config";

export function suscribeNewsletterApi(email) {
  const url = `${API_PATH_PREFIX_EXCLUDE_VERSION}/${API_VERSION}/suscribe-newsletter/${email.toLowerCase()}`;
  const params = {
    method: "POST"
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
