import { fetch as fetchPolyfill } from "whatwg-fetch";
import { AsyncStorage} from 'react-native';

import { api } from "./apis";

const baseUrl = "https://db39d07c3a32.ngrok.io";

let aux = 0;

const tokenApi = (data, url, method, file) => {
  aux++;
  let option = {
    method: "POST",
    // mode:'no-cors',
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dominio: subdomain }),
  };
  return new Promise((resolve, reject) => {
    fetchPolyfill(baseUrl + api.token, option)
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        if (response.success)
          AsyncStorage.setItem("token", response.data.token,()=>{return "error"});
        resolve(serviceApiResponse(data, url, method, file));
      })
      .catch((error) => {
        console.log(error,"El error::::")
        reject(serviceApiResponse(data, url, method, file));
      });
  });
};

const serviceApiGet = (url) => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl+url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(parseJSON)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const serviceApiPost = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then(parseJSON)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const serviceApi = (data, url, method, file) => {
  aux++;
  let option = {
    method,
    // mode:'no-cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return new Promise((resolve, reject) => {
    fetchPolyfill(url, option)
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const serviceApiResponse = (data, url, method, file = false) => {
  if (!AsyncStorage.getItem("token")) {
    if (aux < 4) return tokenApi(data, url, method, file);
    else
      return new Promise((resolve, reject) => {
        resolve({
          success: false,
          data: [],
          text_response:
            "Ocurrió un error al configurar. Por favor intente más tarde",
          error_pathname: true,
        });
      });
  } else {
        let options = {
          method,
          headers: {
            Authorization: "Bearer " + AsyncStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": file ? "multipart/form-data" : "application/json",
          },
          body: JSON.stringify(data),
        };
        return new Promise((resolve, reject) => {
          fetchPolyfill(baseUrl + url, options)
            .then(checkStatus)
            .then(parseJSON)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
}
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.log(response.statusText,"el response:::::")
    let error = new Error(response.statusText);
    if (response.status === 500) {
      error = new Error(
        "Ocurrió un error interno en el servidor, por favor intenté mas tarde o comuníquese con el administrador."
      );
    }
    error.response = response;
    throw error;
  }
};

const parseJSON = (response) => {
  return response.json();
};

const parseJwt = () => {
  let token = AsyncStorage.getItem("token");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload).public_key;
};

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export {
  serviceApiResponse,
  parseJwt,
  b64toBlob,
  serviceApi,
  serviceApiGet,
  serviceApiPost,
};
