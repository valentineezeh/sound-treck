import * as actionTypes from "./types";
import { axios, _catchAxiosError } from "services/axios";

export const getAllSongsStart = () => ({
  type: actionTypes.GET_ALL_SONGS_START
});

export const getAllSongsSuccess = (data, meta) => ({
  type: actionTypes.GET_ALL_SONGS_SUCCESS,
  data,
  meta
});

export const getAllSongsFail = error => ({
  type: actionTypes.GET_ALL_SONGS_FAIL,
  error
});

export const getSingleSongSuccess = userSongs => ({
  type: actionTypes.GET_SINGLE_USER_SONG,
  userSongs
});

export const getAllSongs = (pageNumber, onError = false) => async dispatch => {
  dispatch(getAllSongsStart());

  try {
    const response = await axios({
      method: "get",
      url: `/api/musics`,
      params: { limit: 10, page: pageNumber }
    });

    const { data } = response;
    dispatch(getAllSongsSuccess(data.data, data.meta));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(getAllSongsFail("Could not get songs, please try again"));
  }
};

export const getSingleSong = (userId, onError = false) => async dispatch => {
  try {
    const response = await axios({
      method: "get",
      url: `/api/musics/${userId}`
    });
    const { data } = response;
    dispatch(getSingleSongSuccess(data));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(getAllSongsFail("Could not get songs, please try again"));
  }
};
