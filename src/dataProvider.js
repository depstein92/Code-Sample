import restProvider from "ra-data-simple-rest";
import apiUri from './components/ApiUri';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    const token = localStorage.getItem("token");
    options.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = restProvider(apiUri(), httpClient);

export default dataProvider;