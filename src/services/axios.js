import * as _axios from "axios";
import { BASE_URL } from "utils/constants";

const token = localStorage.getItem("token");

const axios = _axios.create({
  baseURL: BASE_URL,
  headers: {
    contentType: "application/json",
    authorization: token ? token : ""
  }
});

export const _catchAxiosError = (e, onError = false) => {
  let error = {};
  if (e.response === undefined) {
    error.message = "No Internet Connection";
  } else {
    error = e.response.data;
  }
  if (onError) {
    onError(error);
  }
};

export { axios };
