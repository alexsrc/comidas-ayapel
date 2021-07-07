import {fetch as fetchPolyfill} from "whatwg-fetch";
import {AsyncStorage} from 'react-native';
import base64 from 'react-native-base64'

import {api} from "./apis";

const baseUrl = "https://ad4eda5a9c75.ngrok.io";

let aux = 0;

const _storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem(
            key,
            value,
            (error)=>{
                error?console.log("error ",error):console.log("ingreso ")
            }
        );
    } catch (error) {
    }
};

const _retrieveData = async (key) => {
    try {
        let value=null;
        await AsyncStorage.getItem(key).then((result)=>{value=result});
        // console.log("el valor", value)
        return value;
    } catch (error) {
        return value;
    }
};

const tokenApi = (user, pass, url, method) => {
    aux++;
    let option = {
        method: "POST",
        // mode:'no-cors',
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic " + base64.encode(user + ":" + pass)
        }
    };
    return new Promise((resolve, reject) => {
        fetchPolyfill(baseUrl + api.token, option)
            .then(checkStatus)
            .then(parseJSON)
            .then((response) => {
                const value=_storeData("token",response.data.token)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const serviceApiGetWhitoutBaseUrl = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET"
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

const serviceApiGet = (url) => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + url, {
            method: "GET"
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

const serviceApiResponse =async (data, url, method, file = false) => {
    let token=await _retrieveData("token");
    let options = {
        method,
        headers: {
            Authorization: "Bearer " + token,
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
                if(!response.status)this.props.navigation.navigate('Login');
                resolve(response);
            })
            .catch((error) => {
                this.props.navigation.navigate('Login');
                reject(error);
            });
    });

};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
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


export {
    serviceApiResponse,
    parseJwt,
    serviceApi,
    serviceApiGet,
    serviceApiPost,
    tokenApi,
    _retrieveData,
    _storeData,
    serviceApiGetWhitoutBaseUrl
};
