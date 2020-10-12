import axios from "axios";
import toastr from "toastr";
import config from "services/config";
import {
  POST_USER_SONG_SUCCESS,
  POST_USER_SONG_ERROR,
  POST_USER_SONG_IS_LOADING,
  DELETE_POST_USER_SONG_ERROR
} from "./types";

const postUserSongSuccess = postSong => ({
  type: POST_USER_SONG_SUCCESS,
  postSong
});

const postUserSongError = error => ({
  type: POST_USER_SONG_ERROR,
  error
});

const postUserSongIsLoading = () => ({
  type: POST_USER_SONG_IS_LOADING
});

export const deletePostUserSongError = () => ({
  type: DELETE_POST_USER_SONG_ERROR
});

export const postSong = dataObj => async dispatch => {
  dispatch(postUserSongIsLoading());
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${config.apiUrl}/musics`, dataObj, {
      headers: {
        Authorization: token
      }
    });
    const { data } = response;
    dispatch(postUserSongSuccess(data));
    toastr.success("You have successfully posted a song.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        postUserSongError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(postUserSongError(data));
    }
  }
};
