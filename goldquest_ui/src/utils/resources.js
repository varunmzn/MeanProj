import { Auth } from 'aws-amplify';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import mimeTypes from 'mime-types';

const API_BASE = process.env.API_BASE;
const environment = process.env.ENV_NAME;
const BASE_URL = process.env.BASE_URL;

const makeAPI = baseURL => {
    let api = axios.create({baseURL});
    api.interceptors.request.use(config => Auth.currentSession().then(resp => {
        config.headers.Authorization = `Bearer ${resp.idToken.jwtToken}`;
        return Promise.resolve(config);
    }));
    return api;
};

function getCookie(cookie) {
    let matches = document.cookie.match(new RegExp(`(^| )${cookie}=([^;]+)`));
    if (matches && matches.length === 3) {
        return matches[2];
    }
    return null;
}

/**
 * Function to download files requiring authorization, from API
 *
 * @param {string} apiType Key to the API in the dataResource object you wish to download from
 * @param {string} url Relative API URL to hit
 * @param {string} name Filename you want the file to save as, without the extension
 */
function downloadFile(apiType, url, name = 'download') {
    dataResource[apiType].get(url, {
        responseType: 'blob'
    }).then(response => {
        let extension = mimeTypes.extension(response.data.type);
        let url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}.${extension}`);
        document.body.appendChild(link);
        link.click();
    });
}

let dataResource = {
    API: makeAPI(API_BASE),
    baseURL: BASE_URL,
    apiURL: API_BASE,
    environment,
    getCookie,
    downloadFile,
    payload: () => Auth.currentSession().then(resp => {
        let payload = jwtDecode(resp.idToken.jwtToken);
        return payload;
    })
};

export default dataResource;
