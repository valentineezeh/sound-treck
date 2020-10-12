// import { axios, _catchAxiosError } from 'services/axios';
import axios from "axios";
import toastr from "toastr";
import config from "services/config";
import {
  UPLOAD_SONG_SUCCESS,
  UPLOAD_SONG_ERROR,
  UPLOAD_SONG_IS_LOADING,
  DELETE_UPLOAD_SONG_ERROR
} from "./types";

const uploadSong = song => ({
  type: UPLOAD_SONG_SUCCESS,
  song
});

const uploadSongError = error => ({
  type: UPLOAD_SONG_ERROR,
  error
});

const uploadSongIsLoading = () => ({
  type: UPLOAD_SONG_IS_LOADING
});

export const deleteUploadSongErrorMessages = () => ({
  type: DELETE_UPLOAD_SONG_ERROR
});

export const uploadUserSong = music => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    dispatch(uploadSongIsLoading());
    const formData = new FormData();
    formData.set("music", music);
    const response = await axios.post(
      `${config.apiUrl}/upload/music`,
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    );
    const { data } = response;
    dispatch(uploadSong(data.data));
    toastr.success("Song upload was successful.");
    formData.delete("music");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadSongError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadSongError(data.message));
    }
  }
};
