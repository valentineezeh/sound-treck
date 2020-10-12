import {
  GET_ALL_MUSICIANS,
  GET_ALL_MUSICIANS_ERROR,
  GET_ALL_MUSICIANS_START
} from "./types";
import { axios, _catchAxiosError } from "services/axios";

export const getAllMusicians = data => ({
  type: GET_ALL_MUSICIANS,
  data
});

export const getAllMusiciansError = error => ({
  type: GET_ALL_MUSICIANS_ERROR,
  error
});

export const getAllMusicianLoading = () => ({
  type: GET_ALL_MUSICIANS_START
});

export const getMusicians = (pageNumber, onError = false) => async dispatch => {
  dispatch(getAllMusicianLoading());
  try {
    const response = await axios({
      method: "get",
      url: "/api/users/musicians",
      params: { limit: 10, page: pageNumber }
    });

    const { data } = response;
    dispatch(getAllMusicians(data.data));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(getAllMusiciansError("Could not get songs, please try again"));
  }
};
