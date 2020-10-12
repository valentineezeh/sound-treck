import axios from "axios";

const setAuthorizationToken = token => {
  if (token) {
    // eslint-disable-next-line no-return-assign
    return (axios.defaults.headers.common.Authorization = token);
  }
  delete axios.defaults.headers.common.Authorization;
};

export default setAuthorizationToken;
