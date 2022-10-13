import axios from "axios";

const setLogin = (BASE_URL, body) => {
  return axios.post(BASE_URL,body, {});
};

export default setLogin;