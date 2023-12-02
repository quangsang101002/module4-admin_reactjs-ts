import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const getHeaders = {
  "X-API-Key": window.localStorage.getItem("X-API-Key") || null,
};

const getHeadersCustomers = {
  "X-API-Key-customers":
    window.localStorage.getItem("X-API-Key-customers") || null,
};

export { getHeaders, getHeadersCustomers };
export default axios;
